import HDWalletProvider from "@truffle/hdwallet-provider";
import Web3 from 'web3';
import { Contractinterface,bytecode } from './compile.js';
import dotenv from 'dotenv';
dotenv.config();

const provider = new HDWalletProvider(
  process.env.MNEUMONIC_PASSWORD,
  process.env.TEST_NETWORK_URL
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(Contractinterface))
    .deploy({ data: bytecode })
    .send({ gas: '1000000', from: accounts[0] });

  console.log(Contractinterface);
  console.log("Contract deployed to", result.options.address);
  provider.engine.stop();
};
deploy();