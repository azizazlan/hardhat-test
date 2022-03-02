# Hardhat test with Chainlink

This hardhat test project is similar to Harry's repo https://github.com/pappas999/my-first-hh but with typescript support.

## Prerequisites

- You need an [Alchemy](https://www.alchemy.com/) account. Copy the contents of the example of the evironment file(.env.example) and create a new environment file (.env). Then set the `KOVAN_URL` and corresponding `PRIVATE_KEY`.

- You need some ethers since the integration test will be executed on the Kovan network. You can get it from [ gitter ](https://gitter.im/kovan-testnet/faucet) or https://ethdrop.dev/ ( You will also need some ethers for Rinkeby network )

- Subscribe to chainlink to get subscription id. Refer [here](https://docs.chain.link/docs/get-a-random-number/#create-and-fund-a-subscription)

## 🚀 Usage

```sh
npm install
```

```sh
npx hardhat test
```

If you want to run only one test for example, the integration test on the "Kovan" network, then run:

```sh
npx hardhat test test/integration/index.ts --network kovan
```

Make sure you have the Chainlink's subscription id before VRFv2Consumer smart contract can be deployed. The subscription id is set in the `scripts/deploy-VRFv2Consumer.ts` file.

Also make sure you configure the `RINKEBY_URL` and `RINKEBY_PRIVATE_KEY` in the .env file.

Then run the command below to deploy the smart contract:

```sh
npx hardhat run --network rinkeby scripts/deploy-VRFv2Consumer.ts
```

Once deployed, the script should display the address, for example:

```
VRFv2Consumer deployed to: 0xec06C0e1277479641CB48d27a124a0F041bA5bE5
```

Then in the Subscription Manager page, add a consumer using the smart contract address above.

Then in the `test/integration/VRFConsumer.ts`, substitute your contract address. For example:

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

Then run the ([VRFv2Consumer](VRFv2Consumer)) test:

```sh
npx hardhat --network rinkeby test test/integration/VRFConsumer.ts
```

You may monitor the request at the Subscription Manager [page](https://vrf.chain.link/)

## Credits

https://chain.link/

https://github.com/pappas999
