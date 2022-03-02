import chai, { expect } from 'chai';
import { solidity } from 'ethereum-waffle';
chai.use(solidity);
import { ethers } from 'hardhat';
import { VRFv2Consumer } from '../../typechain';

describe('VRF Integration Test', function () {
  let smartContractInstance: VRFv2Consumer;

  beforeEach(async function () {
    const VRFv2Consumer = await ethers.getContractFactory('VRFv2Consumer');
    smartContractInstance = VRFv2Consumer.attach(
      '0xec06C0e1277479641CB48d27a124a0F041bA5bE5',
    );
  });

  it('check subscription id', async function () {
    // Uncomment 2 lines below to request, for me it took about 5 minutes for each request!
    // const transaction = await smartContractInstance.requestRandomWords();
    // await new Promise((resolve) => setTimeout(resolve, 300000)); // 5 minutes
    const result = await smartContractInstance.s_randomWords(1); // I did two requestRandomWords, so index 1 and 1
    console.log(result);
  });
});
