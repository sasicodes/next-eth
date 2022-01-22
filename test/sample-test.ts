import { expect, test } from '@playwright/test'
import { ethers } from 'hardhat'
test('Greeter', async () => {
  const Greeter = await ethers.getContractFactory('Greeter')
  const greeter = await Greeter.deploy('Hello, world!')
  await greeter.deployed()

  expect(await greeter.greet()).toBe('Hello, world!')

  const setGreetingTx = await greeter.setGreeting('Hola, mundo!')

  // wait until the transaction is mined
  await setGreetingTx.wait()

  expect(await greeter.greet()).toBe('Hola, mundo!')
})
