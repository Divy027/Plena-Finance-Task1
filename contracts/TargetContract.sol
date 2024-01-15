// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

contract TargetContract  {

    function transferFunds(address _recipient) external{
        uint256 testContractBalance = address(this).balance;
        require(testContractBalance > 0, "No funds to withdraw");

        (bool success, ) = _recipient.call{value: testContractBalance}("");
        require(success, "Transfer failed");
    }
    
}
