import { expect } from 'chai';
import { ethers } from 'hardhat';
import { NotMyFirstContract } from '../../typechain';

describe('NotMyFirstContract unit test', function () {
  let notMyFirstContract: NotMyFirstContract;

  before(async function () {
    const NotMyFirstContract = await ethers.getContractFactory(
      'NotMyFirstContract',
    );
    notMyFirstContract = await NotMyFirstContract.deploy('Hello, Malaysia!', 0);
    await notMyFirstContract.deployed();
  });

  it("Should return the new greeting once it's changed", async function () {
    expect(await notMyFirstContract.greet()).to.equal('Hello, Malaysia!');

    const setGreetingTx = await notMyFirstContract.setGreeting('Hola, mundo!');

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await notMyFirstContract.greet()).to.equal('Hola, mundo!');
  });

  it('Initial value of number is zero', async function () {
    expect(await notMyFirstContract.getNumber()).to.equal(0);
  });

  it('retrieve returns a value previously stored', async function () {
    await notMyFirstContract.setNumber(666);
    expect(await notMyFirstContract.getNumber()).to.equal(666);
  });
});
