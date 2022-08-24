const { task } = require("hardhat/config");

task("block-number", "Prints the current block number")
  //.addParam("account", "The account's address")
  .setAction(
    // This is arrow function
    async (tasksArgs, hre) => {
      // This hre is Hardhat runtime environment
      // This hre can access all the packages that the hardhat package can, like ethers.
      const block_number = await hre.ethers.provider.getBlockNumber();
      console.log(`Current block number: ${block_number}`);
    }
  );

module.exports = {};
