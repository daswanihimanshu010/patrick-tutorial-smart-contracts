require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");
require("./tasks/view-block-number");
require("hardhat-gas-reporter");
require("solidity-coverage");

/** @type import('hardhat/config').HardhatUserConfig */
const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL;
const GOERLI_PRIVATE_KEY_ACCOUNT1 = process.env.GOERLI_PRIVATE_KEY_ACCOUNT1;
const ETHER_SCAN_API_KEY = process.env.ETHER_SCAN_API_KEY;
const COIN_MARKET_CAP = process.env.COIN_MARKET_CAP;

module.exports = {
  networks: {
    goerli: {
      url: GOERLI_RPC_URL,
      accounts: [GOERLI_PRIVATE_KEY_ACCOUNT1],
      chainId: 5,
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
      // accounts: hardhat gives 10 fake accounts already after running yarn hardhat node,
      chainId: 31337,
    },
  },
  defaultNetwork: "hardhat",
  solidity: "0.8.8",
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: ETHER_SCAN_API_KEY,
  },
  gasReporter: {
    enabled: false, // set it to true to enable gas reporting
    outputFile: "gas-report.txt",
    noColors: true,
    currency: "USD", // to bring the gas in USD
    coinmarketcap: COIN_MARKET_CAP, // to bring the gas in USD
    token: "ETh", // to get cost if we are deploying on a different network
  },
};
