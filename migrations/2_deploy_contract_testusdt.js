const KarToken = artifacts.require("KarToken");
// const TestUSDC = artifacts.require("TestUSDC");
// const Diamond = artifacts.require("Diamond");
// const Item = artifacts.require("Item");

module.exports = function (deployer) {
  deployer.deploy(KarToken);
  // deployer.deploy(TestUSDC);
  // deployer.deploy(Diamond);
  // deployer.deploy(Item);
};
