# Example Code for my Crypto Buddy 😃

## IMPORTANT
A private key has been commited to source here... I have sent 1 rinkeby ether to this address. Send other testnet ether here if you want. But don't expect to keep it... Since the private key is visible to anyone here anyone can control the account.

☠️☠️☠️ DO NOT USE THIS ACCOUNT ON MAINNET!!! ☠️☠️☠️

⚠️⚠️⚠️ DO NOT SEND ANY REAL ETHER TO THIS ADDRESS!!! ⚠️⚠️⚠️

## What does this do?
This deploys the perviously reviewed contracts to a blockchain of your choice. It then links `Test` and `Proxy`.

The script tests:
* setting value on `Test`
* getting value on `Test`
* setting value through `Proxy`
* getting value through `Proxy`
* `Test` and `Proxy` values match

## Choosing a provider
You can choose whatever provider you want by setting it in .env as `PROVIDER`
network | url | example
--- | --- | --- 
ganache | `http://localhost:8545` | `PROVIDER="http://localhost:8545"`
rinkeby | `https://rinkeby.infura.io` | `PROVIDER="https://rinkeby.infura.io"`
ropsten | `https://ropsten.infura.io` | `PROVIDER="https://ropsten.infura.io"`
kovan | `https://kovan.infura.io` | `PROVIDER="https://kovan.infura.io"`

## Usage
Before doing anything make sure to install the dependencies (I use yarn, use npm if that tickles your fancy):
```
yarn
```

### Local (Ganache)
first start your local blockchain run:
```
yarn start:blockchain
```
This is a script setup in `package.json`

The account hardcoded to source starts with an ether balance... if you change the account you must update `package.json`

Make sure to set the correct value in `.env`:
```
PROVIDER="http://localhost:8545"
```

After starting ganache, run in another window:
```
node index.js
```

You should see console output confirming everything works.

### Rinkeby
I have already supplied the hardcoded acccount with 1 ether (this should be plenty for testing).

You will need to set the correct provider in `.env`:
```
PROVIDER="https://rinkeby.infura.io"
```

After setting the provider simply run:
```
node index.js
```

You should see console output confirming everything is working as expected.

### Other Testnets
Follow the same steps as Rinkeby. You will need to fund the account with your own testnet ether in this case however.

