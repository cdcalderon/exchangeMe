import * as fs from 'fs';
const { ethers, network, run } = require('hardhat');
const { verify } = require('../utils/verify');

async function main() {
  console.log('network.config.chainId ', network.config.chainId);
  console.log('process.env.ETHERSCAN_API_KEY ', process.env.ETHERSCAN_API_KEY);
  if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
    console.log('Verifying...');

    await verify('0x8b337E2171EA4F8F0C96CC9dF5B8570590d608F1', []);
    await verify('0x02F60CCc9447cE3cde1C24a6E8Bd6D9Aa21bC299', []);
    await verify('0x6560C29EA946dD49C76077BDFc1c58EC1b6f0943', []);
    await verify('0x9665Abe2904D48C7A40485F9083c13F6F1Cc75b4', []);
  }
}

// // We recommend this pattern to be able to use async/await everywhere
// // and properly handle errors.
// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });

// const { run } = require('hardhat');

// const verify = async (contractAddress, args) => {
//   console.log('Verifying contract...');
//   try {
//     await run('verify:verify', {
//       address: contractAddress,
//       constructorArguments: args,
//     });
//   } catch (e) {
//     if (e.message.toLowerCase().includes('already verified')) {
//       console.log('Already verified!');
//     } else {
//       console.log(e);
//     }
//   }
// };

// module.exports = {
//   verify,
// };
