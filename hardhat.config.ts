import '@nomiclabs/hardhat-waffle'
import 'hardhat-gas-reporter'
import '@nomiclabs/hardhat-etherscan'
import '@nomiclabs/hardhat-waffle'

import * as dotenv from 'dotenv'
import { HardhatUserConfig, task } from 'hardhat/config'
dotenv.config()

task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners()

  for (const account of accounts) {
    console.log(account.address)
  }
})

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const config: HardhatUserConfig = {
  solidity: '0.8.9',
  networks: {
    rinkeby: {
      url: process.env.RINKEBY_RPC_URL || '',
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : []
    }
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: 'USD'
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  }
}

export default config
