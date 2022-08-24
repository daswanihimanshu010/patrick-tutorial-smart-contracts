const { ethers } = require("hardhat");
const { assert, expect } = require("chai");
// describe is a keyword that mocha in javascript will recognize

// describe(String whatDoesTestDo, function () {})
// describe(String whatDoesTestDo, () => {})

describe("SimpleStorage", function () {
  // We are defining them as const variables because our it() function also have to use these variables
  let simpleStorageFactory, simpleStorage;

  // beforeEach function is going to tell us what to do before each of our it()
  // beforeEach test (it functions) we are gonna deploy the contract so we can test our smart
  // contract with a brand new contract each time.

  beforeEach(async function () {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await simpleStorageFactory.deploy();
  });

  // it() will be function where we actually write the code to run the tests
  // This is where we say what this particular test will do
  // it(String whatDoesTestDo, () => {})
  it("Should start with a favourite number of 0", async function () {
    const favouriteNumber = await simpleStorage.retrieve();
    const expectedValue = "0";

    // We can compare these 2 values by using assert or expect keyword which we can import from chai package
    assert.equal(favouriteNumber.toString(), expectedValue);
    // favouriteNumber.toString() because we will get a big number which needs to be converted into string
  });

  it("Should update the value when we call store", async function () {
    const expectedValue = "7";
    const storeResponse = await simpleStorage.store_with_gas(expectedValue);
    await storeResponse.wait(1);
    const updatedValue = await simpleStorage.retrieve();
    // We can compare these 2 values by using assert or expect keyword which we can import from chai package
    expect(updatedValue.toString()).to.equal(expectedValue);
  });

  // We can have more describe, beforeEach and it function inside describe function
  // in a nested form for modular programming

  //   describe("something", () => {
  //     beforeEach();

  //     it();
  //     it();
  //   });
});
