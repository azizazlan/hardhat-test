import chai, { expect } from 'chai';
import { solidity } from 'ethereum-waffle';
chai.use(solidity);
import { ethers } from 'hardhat';
import { MyFirstIntegratedContract } from '../../typechain';

describe('MyMock', function () {
  let contractInstance: MyFirstIntegratedContract;

  const DECIMALS = '18';
  const INITIAL_PRICE = '200000000000000000000';

  before(async function () {
    const MockV3Aggregator = await ethers.getContractFactory(
      'MockV3Aggregator',
    );
    const mockContractInstance = await MockV3Aggregator.deploy(
      DECIMALS,
      INITIAL_PRICE,
    );
    await mockContractInstance.deployed();

    const MyFirstIntegratedContract = await ethers.getContractFactory(
      'MyFirstIntegratedContract',
    );
    contractInstance = await MyFirstIntegratedContract.deploy(
      mockContractInstance.address,
    );
    await contractInstance.deployed();
  });

  it('Price value should equal to initial price', async function () {
    let latestPrice = await contractInstance.getLatestPrice();
    expect(
      ethers.BigNumber.from(latestPrice).eq(
        ethers.BigNumber.from(INITIAL_PRICE),
      ),
    ).to.be.true;
  });
});
