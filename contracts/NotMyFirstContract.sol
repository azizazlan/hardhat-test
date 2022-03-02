//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import 'hardhat/console.sol';

contract NotMyFirstContract {
  string private greeting;
  uint256 private number;

  constructor(string memory _greeting, uint256 _number) {
    // console.log('Deploying a NotMyFirstContract with greeting:', _greeting);
    greeting = _greeting;
    number = _number;
  }

  function greet() public view returns (string memory) {
    return greeting;
  }

  function setGreeting(string memory _greeting) public {
    // console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
    greeting = _greeting;
  }

  function setNumber(uint256 _number) public {
    number = _number;
  }

  function getNumber() public view returns (uint256) {
    return number;
  }
}
