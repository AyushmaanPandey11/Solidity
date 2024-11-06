import path from 'path';
import fs from 'fs';
import solc from 'solc';

const inboxPath = path.resolve('contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');

export const contractInterface = solc.compile(source, 1).contracts[':Inbox']
