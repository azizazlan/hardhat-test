# Hardhat test with Chainlink

This hardhat test project is similar to Harry's repo https://github.com/pappas999/my-first-hh but with typescript support.

## Prerequisites

- You need an [Alchemy](https://www.alchemy.com/) account. Copy the contents of the example of the evironment file(.env.example) and create a new environment file (.env). Then set the `KOVAN_URL` and corresponding `PRIVATE_KEY`.

- You need some ethers since the integration test will be executed on the Kovan network. You can get it from [ gitter ](https://gitter.im/kovan-testnet/faucet) or https://ethdrop.dev/ ( You will also need some ethers for Rinkeby network )

- Subscribe to chainlink to get subscription id. Refer [here](https://docs.chain.link/docs/get-a-random-number/#create-and-fund-a-subscription)

## 🚀 Usage

Clone this repo, then do:

```sh
npm install
```

## Test 1

A simple and straight forward test against NotMyFirstContract.sol. (Sorry, the contract name is meant to be a joke). To run this test do:

```[sh](sh)
npx hardhat test --grep "NotMyFirstContract"
```

## Test 2

This is an integration test between MyFirstIntegratedContract and AggregatorV3Interface smart contracts.

Before run the test, make sure the the `KOVAN_URL` is configured in the .env file.

To run the test do:

```sh
npx hardhat test --grep "MyFirstIntegration" --network kovan
```

## Test 3

This is a test that uses Chainlink VRF. I strongly suggest you read [this](https://docs.chain.link/docs/chainlink-vrf/) first.

Make sure you have the Chainlink's subscription id before VRFv2Consumer smart contract can be deployed. The subscription id is set in the `scripts/deploy-VRFv2Consumer.ts` file.

Also make sure you configure the `RINKEBY_URL` and `RINKEBY_PRIVATE_KEY` in the .env file.

Then run the command below to deploy the VRFv2Consumer smart contract:

```sh
npx hardhat run --network rinkeby scripts/deploy-VRFv2Consumer.ts
```

Once the contract is deployed, the script should display its address in the terminal, for example:

```
VRFv2Consumer deployed to: 0xec06C0e1277479641CB48d27a124a0F041bA5bE5
```

Then in the Subscription Manager [page](https://vrf.chain.link/), add a consumer using the smart contract address above.
Then edit the `test/integration/vrfconsumer-test.ts` to substitute your contract address for the input paramater of the "attach" function like below.

```javascript
let smartContractInstance: VRFv2Consumer;

beforeEach(async function () {
  const VRFv2Consumer = await ethers.getContractFactory('VRFv2Consumer');
  //use "attach" as the smart contract was deployed earlier
  smartContractInstance = VRFv2Consumer.attach(
    '0xec06C0e1277479641CB48d27a124a0F041bA5bE5', //<-- your smart contract address
  );
});
```

Then run the test:

```sh
npx hardhat test --grep "VRFv2Consumer" --network rinkeby
```

Make sure you uncomment the following lines in the test/integration/vrfconsumer-test.ts file:

```javascript
const transaction = await smartContractInstance.requestRandomWords();
await new Promise((resolve) => setTimeout(resolve, 300000)); // 5 minutes
```

I ran the test for 3 times. The first two tests were to request `requestRandomWords`. I did twice because I thought something went wrong but actually the request just took a little longer than 3 minutes. Being impatient and not knowing the transaction was in the Pending state, I continue to run another (second) test. This time I have to wait for about 5 minutes!

You should monitor the request(s) in the Subscription Manager [page](https://vrf.chain.link/). The pending transactions should be displayed in the "Pending" section.

Once the requests ( in my case two of them ) have been successfully transacted. I ran the (third)test again with the following lines commented:

```javascript
//const transaction = await smartContractInstance.requestRandomWords();
//await new Promise((resolve) => setTimeout(resolve, 300000)); // 5 minutes

const result0 = await smartContractInstance.s_randomWords(0); // two requestRandomWords, so index 0 and 1
console.log(result0);
const result1 = await smartContractInstance.s_randomWords(1);
console.log(result1);
```

Okay it might not be the chai/mocha style "test" (without the expect and etc) but that will be changed later!

## Test 4

Another unit test but this time utilising MockV3Aggregator smart contract. To test, do:

```sh
npx hardhat test --grep "MyMock"
```

## Test coverage

For example, run only the tests in the unit test, do:

```sh
npx hardhat coverage --testfiles "test/unit/*.ts"
```

That's it! Yep it is all about testing!

[##](##) Credits

https://chain.link/

https://github.com/pappas999
