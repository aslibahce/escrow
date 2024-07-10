// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract EscrowOperationList {

	struct Operation{
		uint id;
        address arbiter;
        address beneficiary;
		address depositor;
        uint256 amount;
	}

	Operation[] public operations;

	function addEscrow(address arbiter, address beneficiary, address depositor, uint256 amount) external {
		operations.push(Operation(operations.length + 1, arbiter, beneficiary, depositor, amount));
	}

	function getEscrowOperations() public view returns(Operation[] memory){
		Operation[] memory memoryOperations = new Operation[](operations.length);
		for(uint i = 0; i < operations.length; i++){
			memoryOperations[i] = operations[i];
		}
        return memoryOperations;
	}
}
