import { ethers } from 'hardhat';
import { expect } from 'chai';
import { anyValue } from '@nomicfoundation/hardhat-chai-matchers/withArgs';
import { Token } from '../typechain-types/Token';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { BigNumber, ContractReceipt, ContractTransaction } from 'ethers';

const tokens = (n: string | number) => {
  return ethers.utils.parseUnits(n.toString(), 'ether');
};

describe('Token', function () {
  let token: Token;
  let accounts: SignerWithAddress[];
  let deployer: SignerWithAddress;
  let receiver: SignerWithAddress;

  beforeEach(async () => {
    const Token = await ethers.getContractFactory('Token');
    token = await Token.deploy('Poncho', 'PCHO', '1000000');

    accounts = await ethers.getSigners();
    deployer = accounts[0];
    receiver = accounts[1];
  });

  describe('Deployment', () => {
    const name = 'Poncho';
    const symbol = 'PCHO';
    const decimals = '18';
    const totalSupply = tokens('1000000');

    it('has correct name', async () => {
      expect(await token.name()).to.equal(name);
    });

    it('has correct symbol', async () => {
      expect(await token.symbol()).to.equal(symbol);
    });

    it('has correct decimals', async () => {
      expect(await token.decimals()).to.equal(decimals);
    });

    it('has correct total supply', async () => {
      expect(await token.totalSupply()).to.equal(totalSupply);
    });

    it('assigns total supply to deployer correctly', async () => {
      expect(await token.balanceOf(deployer.address)).to.equal(totalSupply);
    });
  });

  describe('Transfer Tokens', () => {
    let amount: BigNumber;
    let transferTransaccion;
    let result: ContractReceipt;

    beforeEach(async () => {
      amount = tokens(100);
      // Transfer tokens
      transferTransaccion = await token
        .connect(deployer)
        .transfer(receiver.address, amount);
      result = await transferTransaccion.wait();
    });

    describe('Success', () => {
      it('transfer token and adjust balances', async () => {
        expect(await token.balanceOf(deployer.address)).to.equal(
          tokens(999900)
        );
        expect(await token.balanceOf(receiver.address)).to.equal(amount);
      });

      it('emits a Transfer event', () => {
        const events: any = result.events;
        const transferEvent = events[0];
        expect(transferEvent.event).to.equal('Transfer');

        const args = transferEvent.args;
        expect(args.from).to.equal(deployer.address);
        expect(args.to).to.equal(receiver.address);
        expect(args.value).to.equal(amount);
      });
    });

    describe('Failure', () => {
      it('rejects insufficient balances', async () => {
        const invalidTransferAmount = tokens(10000000);
        await expect(
          token
            .connect(deployer)
            .transfer(receiver.address, invalidTransferAmount)
        ).to.be.reverted;
      });

      it('reverts invalid to address', async () => {
        const amount = tokens(100);
        await expect(
          token
            .connect(deployer)
            .transfer('0x0000000000000000000000000000000000000000', amount)
        ).to.be.reverted;
      });
    });
  });
});
