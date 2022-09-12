//import { Token } from './../typechain-types/Token';
import { ethers } from 'hardhat';
import fs from 'fs';

async function main() {
  //Fetch contract to deploy
  const Token = await ethers.getContractFactory('Token');

  // Deploy contract
  const token = await Token.deploy('Poncho', 'PCHO', '1000000');
  await token.deployed();
  console.log(`Token deployed to: ${token.address}`);

  let addressesJSON = JSON.stringify({ tokenContract: token.address });
  fs.writeFileSync('../src/environments/contract-address.json', addressesJSON);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
