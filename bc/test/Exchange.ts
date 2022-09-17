import { ethers } from 'hardhat';
import { expect } from 'chai';
import { Exchange, Token } from '../typechain-types';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { ContractReceipt } from 'ethers';

const tokens = (n: string | number) => {
  return ethers.utils.parseUnits(n.toString(), 'ether');
};

describe('Exchange', () => {
  let deployer;
  let feeAccount: SignerWithAddress;
  let user1: SignerWithAddress;
  let exchange: Exchange;
  let token1: Token;
  let accounts: SignerWithAddress[];
  const feePercent = 10;

  beforeEach(async () => {
    accounts = await ethers.getSigners();
    deployer = accounts[0];
    feeAccount = accounts[1];
    user1 = accounts[2];

    const Exchange = await ethers.getContractFactory('Exchange');
    exchange = await Exchange.deploy(feeAccount.address, feePercent);

    const Token = await ethers.getContractFactory('Token');
    token1 = await Token.deploy('Poncho', 'PCHO', '1000000');

    // transfer token to user1
    let transferToken1Transaction = await token1
      .connect(deployer)
      .transfer(user1.address, tokens(100));
    await transferToken1Transaction.wait();

    exchange = await Exchange.deploy(feeAccount.address, feePercent);
  });

  describe('Deployment', () => {
    it('tracks the fee account', async () => {
      expect(await exchange.feeAccount()).to.equal(feeAccount.address);
    });

    it('tracks the fee percent', async () => {
      expect(await exchange.feePercent()).to.equal(feePercent);
    });
  });

  describe('Deposit Tokens', () => {
    let transaction;
    let result: ContractReceipt;
    let amount = tokens(10);
    describe('Success', () => {
      beforeEach(async () => {
        // Approve Token
        transaction = await token1
          .connect(user1)
          .approve(exchange.address, amount);
        result = await transaction.wait();

        // Deposit token
        transaction = await exchange
          .connect(user1)
          .depositToken(token1.address, amount);
        result = await transaction.wait();
      });

      it('tracks and updates the token deposit', async () => {
        expect(await token1.balanceOf(exchange.address)).to.equal(amount);
      });

      it('store and updates the exchange deposit and allowance', async () => {
        expect(await exchange.tokens(token1.address, user1.address)).to.equal(
          amount
        );
        expect(
          await exchange.balanceOf(token1.address, user1.address)
        ).to.equal(amount);
      });

      it('emits a Deposit event', async () => {
        const events: any = result.events;
        const transferEvent = events[1];
        expect(transferEvent.event).to.equal('Deposit');

        const args = transferEvent.args;
        expect(args.token).to.equal(token1.address);
        expect(args.user).to.equal(user1.address);
        expect(args.amount).to.equal(amount);
        expect(args.balance).to.equal(amount);
      });
    });

    describe('Failure', () => {
      it('fails when no tokens are approved', async () => {
        // Do not approve any tokens before calling depositToken
        await expect(
          exchange.connect(user1).depositToken(token1.address, amount)
        ).to.be.reverted;
      });
    });
  });
});
