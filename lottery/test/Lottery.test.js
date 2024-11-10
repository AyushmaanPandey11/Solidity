import ganache from "ganache";
import assert from "assert";
import Web3 from "web3";
import { Contractinterface,bytecode } from "../compile.js";

const web3 = new Web3(ganache.provider());
let Lottery;
let accounts;

beforeEach(async ()=>{
    accounts = await web3.eth.getAccounts();
    Lottery = await new web3.eth.Contract(JSON.parse(Contractinterface))
        .deploy({data:bytecode})
        .send({from:accounts[0],gas:"1000000"});
});

describe('Lottery Contract', ()=> {
    it('Contract Deployment', ()=>{
        assert.ok(Lottery.options.address);
    });

    it('Checking players address addition', async()=>{
        await Lottery.methods.enter().send(
            {
                from:accounts[0],
                value:web3.utils.toWei('0.02','ether')
            }
        );
        await Lottery.methods.enter().send(
            {
                from:accounts[1],
                value:web3.utils.toWei('0.02','ether')
            }
        );
        await Lottery.methods.enter().send(
            {
                from:accounts[2],
                value:web3.utils.toWei('0.02','ether')
            }
        );
        const players = await Lottery.methods.getPlayers().call({
            from: accounts[0]
        });
        assert.equal(accounts[0],players[0]);
        assert.equal(accounts[1],players[1]);
        assert.equal(accounts[2],players[2]);
        assert.equal(3,players.length);
    });
    it('Checking minimum amount of ether to enter', async()=>{
        try {
            await Lottery.methods.enter.send({
                from:accounts[0],
                value:0
            });
            assert(false);
        } catch (error) {
            assert(error);
        }
    });
    it('QuickWinner function testing Manager access', async()=>{
        try{
            await Lottery.methods.pickWinner().send({
            from:accounts[1]
        });
        assert(false);
        }catch(error){
            assert(error);
        }
    });
    it('Send money to winner and reset the contract', async () => {
        await Lottery.methods.enter().send({
            from:accounts[0],
            value: web3.utils.toWei('2','ether')
        });
        const initialBal = await web3.eth.getBalance(accounts[0]);
        await Lottery.methods.pickWinner().send({from:accounts[0]});
        const finalBal = await web3.eth.getBalance(accounts[0]);
        const difference = finalBal-initialBal;
        console.log(difference);
        assert(difference > web3.utils.toWei('1.9','ether'));
        const players = await Lottery.methods.getPlayers().call({from:accounts[0]});
        assert.equal(0,players.length);
    })
});

