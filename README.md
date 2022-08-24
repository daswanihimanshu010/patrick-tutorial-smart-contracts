# To start a new project & compile

Hardhat projects are Node.js projects with the hardhat package installed and a hardhat.config.js file.

1. yarn init: Initilizes empty package.json
2. yarn add --dev hardhat: Adding hardhat dependencies
3. yarn hardhat: Starting a new hardhat project
4. yarn hardhat compile: Compiling the contracts
5. yarn add --dev dotenv: To add .env module
   Then import on top where you want to use.

scripts folder: Where we write deploy.js or our javascript code to interact with our smart contracts.
contracts folder: Smart contracts collection
test folder: Run some tests before deploying contract, is attached with contract
cache folder: Has more info about compiled version of smart contract

# To deploy a hardhat project

6. yarn hardhat run scripts/deploy.js: will deploy the script on hardhat default fake local blockchain / same like ganache

For default hardhat network we do need to define the private key or RPC url to run a script.
We can run the multiple scripts on multiple networks on hardhat.
The network tag helps in running the deploy.js on any network.

7. yarn hardhat run scripts/deploy.js --network hardhat
   yarn hardhat run scripts/deploy.js --network rinkeby

# Etherscan verify contracts progmatically

Visit: https://docs.etherscan.io/tutorials/verifying-contracts-programmatically

// Hardhat offers plugins to do stuff like connecting to an api like connect to etherscan to verify contract

Visit: https://hardhat.org/hardhat-runner/plugins/nomiclabs-hardhat-etherscan
Other Community plugins: https://hardhat.org/hardhat-runner/plugins#community-plugins

# To add a new task in the terminal to do for hardhat / Custom tasks

After you call yarn hardhat, it displays a list of commands you can run with hardhat.

yarn hardhat looks into our hardhat.config.js and checks for any new plugins, if there are it will add a new task that we can do in the terminal commands.

"run" package from hardhat is used to run commands of the terminal of hardhat.

We can add new commands in terminal for hardhat by adding new plugins in hardhat.config.js.

Whatever tasks we are writing in tasks folder we have to include it in hardhat.config.js.

Visit: https://hardhat.org/hardhat-runner/docs/advanced/create-task#creating-a-task

# Live Contracts

// Deployed Contract address: 0xa64C49e67ddc7a46EfD43940e81989f5f3cDf7bD
// Verified contract url: https://goerli.etherscan.io/address/0xa64C49e67ddc7a46EfD43940e81989f5f3cDf7bD#code

// If you face any errors during verification in testnet like goerli, delete artifacts and cache folder
and re run the hardhat run command because it compiles the solidity automatically or you can run
yarn hardhat clean

# Arrow functions

These all formats are same. Look into tasks folder for more information.

// default way
async function blockTask() {}
// we can assign a variable to function in javascript
const blockTask = async function(tasksArgs, hre) => {}
// Now we just remove the const part from left
async (tasksArgs, hre) => {}

The only difference is we are never giving our function a name, this is an anonymous function in javascript.

# hre (Hardhat runtime environment)

It is basically same as require("hardhat") that we include in our js files to interact or deploy our smart contract.

This hre can access all the packages that this hardhat package can like ethers.

# tasks and scripts

Tasks are better for plugins, for one special task.
Scripts are best for local development environment.

# Hardhat localhost node

yarn hardhat node is different from deploying your js on hardhat network.
This is called locally running network i.e. localhost.

yarn hardhat node is still using hardhat runtime environment but it is considered as it own separate network when we are running a node that it's going to live of past duration of script.

To deploy on localhost, see hardhat.config.js we have added it to a new network.
yarn hardhat run scripts/deploy.js --network localhost

# Writting Tests

Visit: https://mochajs.org/

Hardhart uses mochajs to write tests. See storage-deploy-test.js for more information.

To run tests: yarn hardhat test
To run a particular test: yarn hardhat test --grep (keywords in whatToDo defined in it() function)

# To test how much gas each of function will cost

Visit: https://www.npmjs.com/package/hardhat-gas-reporter

We can set configurations for gas reported in hardhat.config.js

It can be tested via: yarn hardhat test

# Solidity coverage

It is a hardhat plugin which goes all over our tests and sees exactly how many lines of our code in our
contract are actually tested

Visit: https://github.com/sc-forks/solidity-coverage

To use it: yarn hardhat coverage

# Hardhat waffle

Visit: https://hardhat.org/hardhat-runner/plugins/nomiclabs-hardhat-waffle
