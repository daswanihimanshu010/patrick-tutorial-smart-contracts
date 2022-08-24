const { ethers, run, network } = require("hardhat");
// hardhat is used instead of ethers see package.json dependencies for more info
require("dotenv").config();

async function main() {
  // directly specify the contract name in factory setup, this is because we are importing from hardhat
  const simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");

  console.log("Deploying, please wait...");

  const simpleStorage = await simpleStorageFactory.deploy();

  // to wait, to make sure it is deployed we do:

  await simpleStorage.deployed();
  console.log(`contract deployed at address: ${simpleStorage.address}`);

  // We do not want to verify our contract if we are running on hardhat, because it will given error
  // as it cannot verify the contract using ether scan verify api that we have made below

  // To get on which network we are on so we can run verify function according to that
  // network is imported from hardhat above
  // We can use chainId from network to figure are we on live net or test net or local development
  // console.log(network.config);

  // 4 == "4" -> true
  // 4 == 4 -> true
  // 4 === "4" -> false
  // In javascript if variable exists then it gives boolean result as true.

  if (network.config.chainId === 5 && process.env.ETHER_SCAN_API_KEY) {
    // Sometimes etherscan takes time to even get notice of the transaction. So in this case we need
    // to wait for few block confirmations before running verify function.
    // wait 6 block confirmations before running verify

    await simpleStorage.deployTransaction.wait(6);
    await verify(simpleStorage.address, []);
  }

  // retrieving favourite number from contract
  const favouriteNumber = await simpleStorage.retrieve();
  console.log(`Current favourite number is: ${favouriteNumber}`);

  // updating favourite number
  const transactionResponse = await simpleStorage.store_with_gas(87);
  // We have to wait for 1 block confirmation for transaction to go through
  await transactionResponse.wait(1);
  // retrieving updated favourite number from contract
  const updatedFavouriteNumber = await simpleStorage.retrieve();
  console.log(`Current favourite number is: ${updatedFavouriteNumber}`);
}

async function verify(contractAddress, args) {
  // Now we will import run command to run any hardhat console tasks like verify
  console.log("Verifying, please wait...");

  // to get want commands that verify has to offer insdie verify task run yarn hardhat verify --help
  // that is why we are using verify:verify because there is one more task inside verify named "verify"

  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArgsParams: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already verified!!");
    } else {
      console.log(e);
    }
  }

  // one problem that often comes with verifying contracts
  // What if the contract has already been verified ?
  // Same byte is often processed by etherscan to verify the contract
  // That is why we use try catch around verify
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
