import HDWalletProvider from '@truffle/hdwallet-provider';
import Web3 from 'web3';
import {abi,evm} from "./compile.js"
import dotenv from 'dotenv';
dotenv.config();

const provider = new HDWalletProvider(
    process.env.MNEUMONIC_PASSWORD,
    process.env.TEST_NETWORK_URL
);
const web3 = new Web3(provider);
const ContractArg = 'HI THERE!';
const deploy = async ()=>{
    const fetchAccounts = await web3.eth.getAccounts();
    console.log('Account used for deployment ',fetchAccounts[0]);

    const result = await new web3.eth.Contract(abi)
    .deploy({data:evm.bytecode.object, arguments:[ContractArg]})
    .send({from:fetchAccounts[0],gas:1000000});

    console.log('Contract Address - ',result.options.address);
    provider.engine.stop();
}
deploy();