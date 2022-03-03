import chai, { expect } from 'chai';
import { solidity } from 'ethereum-waffle';
chai.use(solidity);
import { ethers } from 'hardhat';
import { MyFirstIntegratedContract } from '../../typechain';

describe('MyFirstIntegration', function () {
  let contractInstance: MyFirstIntegratedContract;

  before(async function () {
    const MyFirstIntegratedContract = await ethers.getContractFactory(
      'MyFirstIntegratedContract',
    );
    contractInstance = await MyFirstIntegratedContract.deploy(
      '0x9326BFA02ADD2366b30bacB125260Af641031331',
    );
    await contractInstance.deployed();
  });

  it('Price feed value greater than 0', async function () {
    let latestPrice = await contractInstance.getLatestPrice();
    expect(ethers.BigNumber.from(latestPrice).gt(ethers.BigNumber.from(0))).to
      .be.true;
  });
});
