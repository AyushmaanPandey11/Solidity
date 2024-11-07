import path from 'path';
import fs from 'fs';
import solc from 'solc';

const inboxPath = path.resolve('contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');

const compiledContract = solc.compile(source, 1).contracts[':Inbox']
const Contractinterface = compiledContract.interface;
const bytecode = compiledContract.bytecode;
export { Contractinterface,bytecode };