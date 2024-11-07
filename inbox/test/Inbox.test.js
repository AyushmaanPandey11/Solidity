import ganache from 'ganache';
import Web3 from 'web3';
import assert from 'assert';
import { Contractinterface,bytecode } from '../compile.js';
// updated ganache and web3 imports added for convenience

// contract test code will go here
const web3 = new Web3(ganache.provider());

let fetchAccounts;
let inbox;
const INITIAL_MSG= 'HI THERE!';
const SET_MSG='HOW Are You!!';
beforeEach( async ()=> {
    fetchAccounts = await web3.eth.getAccounts();

    inbox = await new web3.eth.Contract(JSON.parse(Contractinterface)).deploy({data:bytecode,arguments:[INITIAL_MSG]})
    .send({from:fetchAccounts[0],gas:'1000000'});
} )

describe('Inbox',()=>{
    it('deploying contract', () => {
        assert.ok(inbox.options.address);
    });

    it('default message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message,INITIAL_MSG);
    })

    it('SetMessage', async ()=>{
        await inbox.methods.setMessage(SET_MSG).send({from:fetchAccounts[0]});
        const message = await inbox.methods.message().call();
        assert.equal(message,SET_MSG);
    })
} )

// class Car {
//     park() {
//         return "Stopped";
//     }
//     drive(){
//         return "Vroom";
//     }
// }

// let car;

// beforeEach( () => {
//     car = new Car();
// } )

// describe( 'Testing Car Class functions' ,() => {
//     it( 'Car parking', ()=>{
//         assert.equal(car.park(),'Stopped')
//     });
//     it('Car driving', ()=>{
//         assert.equal(car.drive(),'Vroom')
//     });
// });