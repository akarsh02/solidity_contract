// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Simple_Token is ERC20 {
  constructor(uint256 initialSupply) ERC20("Simple_Token", "ST1") {
    _mint(msg.sender, initialSupply);
  }

  function decimals() public pure override returns (uint8) {
    return 2;
  }
}
