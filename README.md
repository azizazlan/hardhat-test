[#](#) Hardhat test

This hardhat test project is similar to Harry's repo https://github.com/pappas999/my-first-hh but with typescript support.

## Prerequisites

- You need an [Alchemy](https://www.alchemy.com/) account. Copy the contents of the example of the evironment file(.env.example) and create a new environment file (.env). Then set the `KOVAN_URL` and corresponding `PRIVATE_KEY`.

- You need some ethers since the integration test will be executed on the Kovan network. You can get it from [ gitter ](https://gitter.im/kovan-testnet/faucet) or https://ethdrop.dev/

## 🚀 Usage

```sh
npm install
```

```sh
npx hardhat test
```

If you want to run only one test for example, the integration test, then run:

```sh
npx hardhat test test/integration/index.ts
```

## Credits

https://github.com/pappas999
