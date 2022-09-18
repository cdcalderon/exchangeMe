import { ethers } from 'hardhat';
const config = require('../../src/environments/contract-address.json');

const tokens = (n: string | number) => {
  return ethers.utils.parseUnits(n.toString(), 'ether');
};

const wait = (seconds: number) => {
  const milliseconds = seconds * 1000;
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

async function main() {
  // Fetch accounts from wallet - these are unlocked
  const accounts = await ethers.getSigners();

  // Fetch network
  const { chainId } = await ethers.provider.getNetwork();
  console.log('Using chainId:', chainId);

  // Fetch deployed tokens
  const tokenPoncho = await ethers.getContractAt(
    'Token',
    config[chainId].PCHO.address
  );
  console.log(`Poncho Token fetched: ${tokenPoncho.address}\n`);

  const tokenJedy = await ethers.getContractAt(
    'Token',
    config[chainId].JEDY.address
  );
  console.log(`Jedy Token fetched: ${tokenJedy.address}\n`);

  const tokenChihuahua = await ethers.getContractAt(
    'Token',
    config[chainId].CHIH.address
  );
  console.log(`Chihuahua Token fetched: ${tokenChihuahua.address}\n`);

  // Fetch the deployed exchange
  const exchange = await ethers.getContractAt(
    'Exchange',
    config[chainId].exchange.address
  );
  console.log(`Exchange fetched: ${exchange.address}\n`);

  // Give tokens to account[1]
  const sender = accounts[0];
  const receiver = accounts[1];
  let amount = tokens(10000);

  // user1 transfers 10,000 JEDY...
  let transaction, result;
  transaction = await tokenJedy
    .connect(sender)
    .transfer(receiver.address, amount);
  console.log(
    `Transferred ${amount} tokens from ${sender.address} to ${receiver.address}\n`
  );

  // Set up exchange users
  const user1 = accounts[0];
  const user2 = accounts[1];
  amount = tokens(10000);

  // user1 approves 10,000 PCHO...
  transaction = await tokenPoncho
    .connect(user1)
    .approve(exchange.address, amount);
  await transaction.wait();
  console.log(`Approved ${amount} tokens from ${user1.address}`);

  // user1 deposits 10,000 PCHO...
  transaction = await exchange
    .connect(user1)
    .depositToken(tokenPoncho.address, amount);
  await transaction.wait();
  console.log(`Deposited ${amount} Ether from ${user1.address}\n`);

  // User 2 Approves JEDY
  transaction = await tokenJedy
    .connect(user2)
    .approve(exchange.address, amount);
  await transaction.wait();
  console.log(`Approved ${amount} tokens from ${user2.address}`);

  // User 2 Deposits JEDY
  transaction = await exchange
    .connect(user2)
    .depositToken(tokenJedy.address, amount);
  await transaction.wait();
  console.log(`Deposited ${amount} tokens from ${user2.address}\n`);

  /////////////////////////////////////////////////////////////
  // Seed a Cancelled Order
  //

  // User 1 makes order to get tokens
  let orderId;
  transaction = await exchange
    .connect(user1)
    .makeOrder(tokenJedy.address, tokens(100), tokenPoncho.address, tokens(5));
  result = await transaction.wait();
  console.log(`Made order from ${user1.address}`);

  // User 1 cancels order
  if (result && result.events) {
    orderId = result.events[0].args?.id;
    transaction = await exchange.connect(user1).cancelOrder(orderId);
    result = await transaction.wait();
    console.log(`Cancelled order from ${user1.address}\n`);
  }

  // Wait 1 second
  await wait(1);

  /////////////////////////////////////////////////////////////
  // Seed Filled Orders
  //

  // User 1 makes order
  transaction = await exchange
    .connect(user1)
    .makeOrder(tokenJedy.address, tokens(100), tokenPoncho.address, tokens(10));
  result = await transaction.wait();
  console.log(`Made order from ${user1.address}`);

  // User 2 fills order
  if (result && result.events) {
    orderId = result.events[0].args?.id;
    transaction = await exchange.connect(user2).fillOrder(orderId);
    result = await transaction.wait();
    console.log(`Filled order from ${user1.address}\n`);
  }

  // Wait 1 second
  await wait(1);

  // User 1 makes another order
  transaction = await exchange.makeOrder(
    tokenJedy.address,
    tokens(50),
    tokenPoncho.address,
    tokens(15)
  );
  result = await transaction.wait();
  console.log(`Made order from ${user1.address}`);

  // User 2 fills another order
  if (result && result.events) {
    orderId = result.events[0].args?.id;
    transaction = await exchange.connect(user2).fillOrder(orderId);
    result = await transaction.wait();
    console.log(`Filled order from ${user1.address}\n`);
  }

  // Wait 1 second
  await wait(1);

  // User 1 makes final order
  transaction = await exchange
    .connect(user1)
    .makeOrder(tokenJedy.address, tokens(200), tokenPoncho.address, tokens(20));
  result = await transaction.wait();
  console.log(`Made order from ${user1.address}`);

  // User 2 fills final order
  if (result && result.events) {
    orderId = result.events[0].args?.id;
    transaction = await exchange.connect(user2).fillOrder(orderId);
    result = await transaction.wait();
    console.log(`Filled order from ${user1.address}\n`);
  }
  // Wait 1 second
  await wait(1);

  /////////////////////////////////////////////////////////////
  // Seed Open Orders
  //

  // User 1 makes 10 orders
  for (let i = 1; i <= 10; i++) {
    transaction = await exchange
      .connect(user1)
      .makeOrder(
        tokenJedy.address,
        tokens(10 * i),
        tokenPoncho.address,
        tokens(10)
      );
    result = await transaction.wait();

    console.log(`Made order from ${user1.address}`);

    // Wait 1 second
    await wait(1);
  }

  // User 2 makes 10 orders
  for (let i = 1; i <= 10; i++) {
    transaction = await exchange
      .connect(user2)
      .makeOrder(
        tokenPoncho.address,
        tokens(10),
        tokenJedy.address,
        tokens(10 * i)
      );
    result = await transaction.wait();

    console.log(`Made order from ${user2.address}`);

    // Wait 1 second
    await wait(1);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
