import path from 'path';
import fs from 'fs';
import solc from 'solc';

const lotteryPath = path.resolve( "contracts", "Lottery.sol");
const source = fs.readFileSync(lotteryPath, "utf8");

const compiledContract = solc.compile(source, 1).contracts[":Lottery"];
const Contractinterface = compiledContract.interface;
const bytecode = compiledContract.bytecode;
export { Contractinterface,bytecode };