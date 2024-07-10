import { ethers } from 'ethers';
import EscrowOperationList from './artifacts/contracts/EscrowOperationList.sol/EscrowOperationList.json';

const escrowListContractAddress = "0x73511669fd4dE447feD18BB79bAFeAC93aB7F31f";

export default async function getEscrowListContract(signer) {
    return new ethers.Contract(escrowListContractAddress, EscrowOperationList.abi, signer);
}


