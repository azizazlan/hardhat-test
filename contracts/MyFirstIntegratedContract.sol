//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import '@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol';

contract MyFirstIntegratedContract {
  AggregatorV3Interface internal priceFeed;

  constructor(address _priceFeed) {
    priceFeed = AggregatorV3Interface(_priceFeed);
  }

  function getLatestPrice() public view returns (int256) {
    (
      uint80 roundID,
      int256 price,
      uint256 startedAt,
      uint256 timeStamp,
      uint80 answeredInRound
    ) = priceFeed.latestRoundData();
    return price;
  }
}
