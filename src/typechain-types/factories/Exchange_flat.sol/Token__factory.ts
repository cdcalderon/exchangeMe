/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BigNumberish,
  Overrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type { Token, TokenInterface } from "../../Exchange_flat.sol/Token";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_symbol",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_totalSupply",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "InvalidDestinationAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidTransferAmount",
    type: "error",
  },
  {
    inputs: [],
    name: "NotApprovedTokenBeforeOperation",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "success",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "success",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_from",
        type: "address",
      },
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "success",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405260126002553480156200001657600080fd5b506040516200143a3803806200143a83398181016040528101906200003c919062000369565b826000908051906020019062000054929190620000e1565b5081600190805190602001906200006d929190620000e1565b50600254600a6200007f919062000586565b816200008c9190620005d7565b600381905550600354600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055505050506200069d565b828054620000ef9062000667565b90600052602060002090601f0160209004810192826200011357600085556200015f565b82601f106200012e57805160ff19168380011785556200015f565b828001600101855582156200015f579182015b828111156200015e57825182559160200191906001019062000141565b5b5090506200016e919062000172565b5090565b5b808211156200018d57600081600090555060010162000173565b5090565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b620001fa82620001af565b810181811067ffffffffffffffff821117156200021c576200021b620001c0565b5b80604052505050565b60006200023162000191565b90506200023f8282620001ef565b919050565b600067ffffffffffffffff821115620002625762000261620001c0565b5b6200026d82620001af565b9050602081019050919050565b60005b838110156200029a5780820151818401526020810190506200027d565b83811115620002aa576000848401525b50505050565b6000620002c7620002c18462000244565b62000225565b905082815260208101848484011115620002e657620002e5620001aa565b5b620002f38482856200027a565b509392505050565b600082601f830112620003135762000312620001a5565b5b815162000325848260208601620002b0565b91505092915050565b6000819050919050565b62000343816200032e565b81146200034f57600080fd5b50565b600081519050620003638162000338565b92915050565b6000806000606084860312156200038557620003846200019b565b5b600084015167ffffffffffffffff811115620003a657620003a5620001a0565b5b620003b486828701620002fb565b935050602084015167ffffffffffffffff811115620003d857620003d7620001a0565b5b620003e686828701620002fb565b9250506040620003f98682870162000352565b9150509250925092565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60008160011c9050919050565b6000808291508390505b6001851115620004915780860481111562000469576200046862000403565b5b6001851615620004795780820291505b8081029050620004898562000432565b945062000449565b94509492505050565b600082620004ac57600190506200057f565b81620004bc57600090506200057f565b8160018114620004d55760028114620004e05762000516565b60019150506200057f565b60ff841115620004f557620004f462000403565b5b8360020a9150848211156200050f576200050e62000403565b5b506200057f565b5060208310610133831016604e8410600b8410161715620005505782820a9050838111156200054a576200054962000403565b5b6200057f565b6200055f84848460016200043f565b9250905081840481111562000579576200057862000403565b5b81810290505b9392505050565b600062000593826200032e565b9150620005a0836200032e565b9250620005cf7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff84846200049a565b905092915050565b6000620005e4826200032e565b9150620005f1836200032e565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff04831182151516156200062d576200062c62000403565b5b828202905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806200068057607f821691505b6020821081141562000697576200069662000638565b5b50919050565b610d8d80620006ad6000396000f3fe608060405234801561001057600080fd5b50600436106100935760003560e01c8063313ce56711610066578063313ce5671461013457806370a082311461015257806395d89b4114610182578063a9059cbb146101a0578063dd62ed3e146101d057610093565b806306fdde0314610098578063095ea7b3146100b657806318160ddd146100e657806323b872dd14610104575b600080fd5b6100a0610200565b6040516100ad9190610a22565b60405180910390f35b6100d060048036038101906100cb9190610add565b61028e565b6040516100dd9190610b38565b60405180910390f35b6100ee6103e6565b6040516100fb9190610b62565b60405180910390f35b61011e60048036038101906101199190610b7d565b6103ec565b60405161012b9190610b38565b60405180910390f35b61013c61063b565b6040516101499190610b62565b60405180910390f35b61016c60048036038101906101679190610bd0565b610641565b6040516101799190610b62565b60405180910390f35b61018a610659565b6040516101979190610a22565b60405180910390f35b6101ba60048036038101906101b59190610add565b6106e7565b6040516101c79190610b38565b60405180910390f35b6101ea60048036038101906101e59190610bfd565b610777565b6040516101f79190610b62565b60405180910390f35b6000805461020d90610c6c565b80601f016020809104026020016040519081016040528092919081815260200182805461023990610c6c565b80156102865780601f1061025b57610100808354040283529160200191610286565b820191906000526020600020905b81548152906001019060200180831161026957829003601f168201915b505050505081565b60008073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614156102f6576040517f5209852900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b81600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040516103d49190610b62565b60405180910390a36001905092915050565b60035481565b6000600460008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054821115610467576040517f3c5a808400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205482111561051d576040517fea2ee5f800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b81600560008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546105a59190610ccd565b600560008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555061063084848461079c565b600190509392505050565b60025481565b60046020528060005260406000206000915090505481565b6001805461066690610c6c565b80601f016020809104026020016040519081016040528092919081815260200182805461069290610c6c565b80156106df5780601f106106b4576101008083540402835291602001916106df565b820191906000526020600020905b8154815290600101906020018083116106c257829003601f168201915b505050505081565b600081600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015610762576040517f3c5a808400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61076d33848461079c565b6001905092915050565b6005602052816000526040600020602052806000526040600020600091509150505481565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610803576040517f5209852900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b80600460008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461084e9190610ccd565b600460008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555080600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546108dc9190610d01565b600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8360405161097c9190610b62565b60405180910390a3505050565b600081519050919050565b600082825260208201905092915050565b60005b838110156109c35780820151818401526020810190506109a8565b838111156109d2576000848401525b50505050565b6000601f19601f8301169050919050565b60006109f482610989565b6109fe8185610994565b9350610a0e8185602086016109a5565b610a17816109d8565b840191505092915050565b60006020820190508181036000830152610a3c81846109e9565b905092915050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610a7482610a49565b9050919050565b610a8481610a69565b8114610a8f57600080fd5b50565b600081359050610aa181610a7b565b92915050565b6000819050919050565b610aba81610aa7565b8114610ac557600080fd5b50565b600081359050610ad781610ab1565b92915050565b60008060408385031215610af457610af3610a44565b5b6000610b0285828601610a92565b9250506020610b1385828601610ac8565b9150509250929050565b60008115159050919050565b610b3281610b1d565b82525050565b6000602082019050610b4d6000830184610b29565b92915050565b610b5c81610aa7565b82525050565b6000602082019050610b776000830184610b53565b92915050565b600080600060608486031215610b9657610b95610a44565b5b6000610ba486828701610a92565b9350506020610bb586828701610a92565b9250506040610bc686828701610ac8565b9150509250925092565b600060208284031215610be657610be5610a44565b5b6000610bf484828501610a92565b91505092915050565b60008060408385031215610c1457610c13610a44565b5b6000610c2285828601610a92565b9250506020610c3385828601610a92565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680610c8457607f821691505b60208210811415610c9857610c97610c3d565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610cd882610aa7565b9150610ce383610aa7565b925082821015610cf657610cf5610c9e565b5b828203905092915050565b6000610d0c82610aa7565b9150610d1783610aa7565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115610d4c57610d4b610c9e565b5b82820190509291505056fea2646970667358221220bdfe14d0d30c1d20ba51c9c2ad5147f142d52c74529bb47e24080810ab8340f064736f6c63430008090033";

type TokenConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TokenConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Token__factory extends ContractFactory {
  constructor(...args: TokenConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _name: PromiseOrValue<string>,
    _symbol: PromiseOrValue<string>,
    _totalSupply: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Token> {
    return super.deploy(
      _name,
      _symbol,
      _totalSupply,
      overrides || {}
    ) as Promise<Token>;
  }
  override getDeployTransaction(
    _name: PromiseOrValue<string>,
    _symbol: PromiseOrValue<string>,
    _totalSupply: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _name,
      _symbol,
      _totalSupply,
      overrides || {}
    );
  }
  override attach(address: string): Token {
    return super.attach(address) as Token;
  }
  override connect(signer: Signer): Token__factory {
    return super.connect(signer) as Token__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TokenInterface {
    return new utils.Interface(_abi) as TokenInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Token {
    return new Contract(address, _abi, signerOrProvider) as Token;
  }
}