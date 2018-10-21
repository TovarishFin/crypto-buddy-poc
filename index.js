require('dotenv').config()

const Proxy = require('./Proxy')
const Test = require('./Test')
const Web3 = require('web3')
const chalk = require('chalk')
const assert = require('assert')
const provider = process.env.PROVIDER
const privateKey = "0xa4fc264e3a29022eeba3cb83b4ea0d58d019481ec5321e09786a95993c21a5c3"
const gas = 3e6

const main = async () => {
  const web3 = new Web3(provider)
  console.log(chalk.yellow('web3 setup on rinkeby'))

  const account = web3.eth.accounts.wallet.add(privateKey)
  const { address: from } = account
  console.log(chalk.yellow(`account ${account.address} setup with web3`))


  const test = await new web3.eth.Contract(Test.abi)
    .deploy({ data: Test.bytecode.object })
    .send({ from, gas })
  console.log(chalk.yellow('test contract deployed'))

  const proxy = await new web3.eth.Contract(Proxy.abi)
    .deploy({ data: Proxy.bytecode.object })
    .send({ from, gas })
  console.log(chalk.yellow('proxy contract deployed'))

  console.log(chalk.magenta('contract setup complete!!!'))

  const valueToSet = 55
  await test.methods.set(valueToSet).send({ from, gas })
  console.log(chalk.yellow('value set on test contract'))

  const value = await test.methods.get().call({ from, gas })
  console.log(chalk.blue(`value from test is: ${value.toString()}`))
  assert.equal(
    value.toString(),
    valueToSet.toString(),
    'value should match that set on contract'
  )
  console.log(chalk.magenta('value getters and setters on test are working!!!'))

  await proxy.methods.setTest(test._address).send({ from, gas })
  console.log(chalk.yellow('test has been set in proxy'))

  const proxyValue = await proxy.methods.pull().call()
  console.log(chalk.blue(`proxy value is ${proxyValue.toString()}`))
  console.log(chalk.yellow('proxy value pulled'))

  assert.equal(
    value.toString(),
    proxyValue.toString(),
    'test value and proxy value should match'
  )
  console.log(chalk.magenta('proxy value matches test value!!!'))

  const proxyValueToSet = 77
  await proxy.methods.push(proxyValueToSet).send( { from, gas })
  const updatedProxyValue = await proxy.methods.pull().call({ from, gas })
  console.log(chalk.blue(`updated proxy value is ${updatedProxyValue.toString()}`))
  assert.equal(
    proxyValueToSet.toString(),
    updatedProxyValue.toString(),
    'proxy value returned should match that set'
  )

  const testValueUpdatedViaProxy = await proxy.methods.pull().call( { from, gas })
  console.log(chalk.blue(`test value updated via proxy is: ${testValueUpdatedViaProxy.toString()}`))
  assert.equal(
    updatedProxyValue.toString(),
    testValueUpdatedViaProxy.toString(),
    'updated values on proxy and test should match'
  )

  console.log(chalk.magenta('everything looking good!!!'))
}

main()
