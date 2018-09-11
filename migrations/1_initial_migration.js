var Migrations = artifacts.require("./MyERC721.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
