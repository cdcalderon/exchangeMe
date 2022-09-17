import { ethers } from 'hardhat';
import { expect } from 'chai';
import { anyValue } from '@nomicfoundation/hardhat-chai-matchers/withArgs';
import { Token } from '../typechain-types/Token';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

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
    let amount, transferTransaccion, result;
    it('Transfer token and adjust balances', async () => {
      amount = 100;

      // TODO: Remove once rest of tests are complete
      // let deployerBalance = await token.balanceOf(deployer.address);
      // let receiverBalance = await token.balanceOf(receiver.address);
      // console.log(deployerBalance.toString());
      // console.log(receiverBalance.toString());

      // Transfer tokens
      transferTransaccion = await token
        .connect(deployer)
        .transfer(receiver.address, tokens(amount));
      result = transferTransaccion.wait();

      expect(await token.balanceOf(deployer.address)).to.equal(tokens(999900));
      expect(await token.balanceOf(receiver.address)).to.equal(tokens(amount));

      // deployerBalance = await token.balanceOf(deployer.address);
      // receiverBalance = await token.balanceOf(receiver.address);
      // console.log(deployerBalance.toString());
      // console.log(receiverBalance.toString());
    });
  });
});
