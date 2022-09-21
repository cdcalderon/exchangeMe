//import { Token } from './../typechain-types/Token';
import { ethers } from 'hardhat';
import * as fs from 'fs';

async function main() {
  //Fetch contract to deploy
  const Token = await ethers.getContractFactory('Token');
  const Exchange = await ethers.getContractFactory('Exchange');

  // Fetch accounts
  const accounts = await ethers.getSigners();

  console.log(
    `Accounts fetched:\n${accounts[0].address}\n${accounts[1].address}\n`
  );

  // Deploy contract
  const tokenPoncho = await Token.deploy('Poncho', 'PCHO', '1000000');
  await tokenPoncho.deployed();
  console.log(`Token Poncho deployed to: ${tokenPoncho.address}`);

  const tokenJedy = await Token.deploy('Jedy', 'JEDY', '1000000');
  await tokenJedy.deployed();
  console.log(`Token Jedy deployed to: ${tokenJedy.address}`);

  const tokenChihuahua = await Token.deploy('Chihuas Token', 'CHIH', '1000000');
  await tokenChihuahua.deployed();
  console.log(`Token Chihuahua deployed to: ${tokenChihuahua.address}`);

  const exchange = await Exchange.deploy(accounts[1].address, 10);
  await exchange.deployed();
  console.log(`Exchange Deployed to: ${exchange.address}`);

  const configurationHardHatNetwork = {
    [31337]: {
      exchange: {
        address: exchange.address,
      },
      PCHO: {
        address: tokenPoncho.address,
      },
      JEDY: {
        address: tokenJedy.address,
      },
      CHIH: {
        address: tokenChihuahua.address,
      },
    },
  };

  const configurationHardHatNetworkJSON = JSON.stringify(
    configurationHardHatNetwork
  );

  fs.writeFileSync(
    '../src/environments/contract-address.json',
    configurationHardHatNetworkJSON
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
