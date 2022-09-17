// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

// Uncomment this line to use console.log
import "hardhat/console.sol";

error InvalidTransferAmount();
error InvalidDestinationAddress();

contract Token {
    string public name;
    string public symbol;
    uint256 public decimals = 18;
    uint256 public totalSupply;

    mapping(address => uint256) public balanceOf; // Track Balances
    mapping(address => mapping(address => uint256)) public allowance; //

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );

    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _totalSupply
    ) {
        name = _name;
        symbol = _symbol;
        totalSupply = _totalSupply * (10**decimals);
        balanceOf[msg.sender] = totalSupply; //update the balance of the person deploying (deployer) the smart contract to the entire total supply of the tokens
    }

    function transfer(address _to, uint256 _value)
        public
        returns (bool success)
    {
        if (balanceOf[msg.sender] < _value) revert InvalidTransferAmount();
        if (_to == address(0)) revert InvalidDestinationAddress();

        // Deduct tokens from spender
        balanceOf[msg.sender] = balanceOf[msg.sender] - _value;
        // Credit tokens to receivers
        balanceOf[_to] = balanceOf[_to] + _value;

        emit Transfer(msg.sender, _to, _value);

        return true;
    }

    function approve(address _spender, uint256 _value)
        public
        returns (bool success)
    {
        if (_spender == address(0)) revert InvalidDestinationAddress();

        allowance[msg.sender][_spender] = _value;

        emit Approval(msg.sender, _spender, _value);

        return true;
    }
}
