// replace the name of the contract with which one you want to deploy!
const contractName = "EscrowOperationList";

async function main() {
  const url = "http://localhost:8545";

  let artifacts = await hre.artifacts.readArtifact(contractName);

  const provider = new ethers.providers.JsonRpcProvider(url);

  let privateKey = "0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e";

  let wallet = new ethers.Wallet(privateKey, provider);

  // Create an instance of a Faucet Factory
  let factory = new ethers.ContractFactory(artifacts.abi, artifacts.bytecode, wallet);

  let escrowOperationList = await factory.deploy();

  console.log("EscrowOperationList address:", escrowOperationList.address);

  await escrowOperationList.deployed();
}

main()
 .then(() => process.exit(0))
 .catch(error => {
   console.error(error);
   process.exit(1);
 });