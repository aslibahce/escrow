import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import deploy from './deploy';
import getEscrowListContract from './getEscrowListContract';
import Escrow from './Escrow';
import Operation from './Operation';

const provider = new ethers.providers.Web3Provider(window.ethereum);

export async function approve(escrowContract, signer) {
  const approveTxn = await escrowContract.connect(signer).approve();
  await approveTxn.wait();
}

export async function getEscrowOperations(signer) {
 
  const escrowListContract = await getEscrowListContract(signer);
  const operations = await escrowListContract.getEscrowOperations();
  debugger;
  return operations.map(operation => ({
    ...operation,
    amount: ethers.utils.formatEther(operation.amount.toString())
  }))
}

export async function addEscrow(signer, arbiter, beneficiary, depositor, value) {
  const escrowListContract = await getEscrowListContract(signer);
  const addTnx = await escrowListContract.addEscrow(arbiter, beneficiary, depositor, value);
  await addTnx.wait();
}

function App() {
  const [operations, setOperations] = useState([]);
  const [escrows, setEscrows] = useState([]);
  const [account, setAccount] = useState();
  const [signer, setSigner] = useState();

  useEffect(() => {
    async function getAccounts() {
      const accounts = await provider.send('eth_requestAccounts', []);

      setAccount(accounts[0]);
      setSigner(provider.getSigner());
      const operations = await getEscrowOperations(provider.getSigner());
      setOperations(operations);
    }

    getAccounts();
  }, [account]);

  async function newContract() {
    const beneficiary = document.getElementById('beneficiary').value;
    const arbiter = document.getElementById('arbiter').value;
    const value = ethers.utils.parseEther(document.getElementById('wei').value, 'ether');
    
    const escrowContract = await deploy(signer, arbiter, beneficiary, value);
  
    const escrow = {
      address: escrowContract.address,
      arbiter,
      beneficiary,
      value: ethers.utils.formatEther(value.toString()),
      handleApprove: async () => {
        escrowContract.on('Approved', () => {
          document.getElementById(escrowContract.address).className =
            'complete';
          document.getElementById(escrowContract.address).innerText =
            "✓ It's been approved!";
        });

        await approve(escrowContract, signer);
        const depositor = await escrowContract.depositor();
        debugger;
        await addEscrow(signer, arbiter, beneficiary, depositor, value);
        const operations = await getEscrowOperations(signer);
        setOperations(operations);
      },
    };

    setEscrows([...escrows, escrow]);
  }

  return (
    <>
      <div className="contract">
        <h1> New Contract </h1>
        <label>
          Arbiter Address
          <input type="text" id="arbiter" />
        </label>

        <label>
          Beneficiary Address
          <input type="text" id="beneficiary" />
        </label>

        <label>
          Deposit Amount (in Eth)
          <input type="text" id="wei" />
        </label>

        <div
          className="button"
          id="deploy"
          onClick={(e) => {
            e.preventDefault();

            newContract();
          }}
        >
          Deploy
        </div>
      </div>

      <div className="existing-contracts">
        <h1> Existing Contracts </h1>

        <div id="container">
          {escrows.map((escrow) => {
            return <Escrow key={escrow.address} {...escrow} />;
          })}
        </div>
      </div>

      <div className="existing-contracts">
        <h1> Approved Contracts </h1>

        <div id="container">
          { 
          operations.map((operation) => {
            return <Operation key={operation.id.toString()} {...operation} />;
          })}
        </div>
      </div>
    </>
  );
}

export default App;
