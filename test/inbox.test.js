const assert = require('assert');                        // Inbuilt Node.js Module.
const ganache = require('ganache-cli');                  // Local Test Network.
const Web3 = require('web3');                            // Constructor of web3.js
const web3 = new Web3(ganache.provider());               // Instance of web3.js. Here the 'provider' is provided by 'ganache' itself. So we don't need to set it up manually.
const { interface, bytecode } = require('../compile');   // Importing 'interface' and 'bytecode' properties of the 'contract ---> Inbox' object, which we have exported from 'compile.js'


let accounts;                                                  // We are declaring this here so that its scope will be maintained for entire file.
let inbox;                                                     // This will store our deployed contract.

beforeEach( async () => {                                  
    
    try{                                                       
        accounts = await web3.eth.getAccounts();                                     // "web3.eth.getAccounts()" returns a Promise Object which is resolved with "Addresses of all the accounts which 'ganache-cli' provides."
        
        inbox    = await new web3.eth.Contract(JSON.parse(interface))                // 1] ".Contract(JSON.parse(interface))" -----> This is the "Constructor" Function, hence we are creating an "Instance of the Contract".
                        .deploy({ data : bytecode , arguments : [ 'Swapnil']})       // 2] We can do this by passing the "ABI" i.e 'Interface' of our contract which we have imported above.
                        .send({ from : accounts[0], gas : '1000000'})                // 3] Now we are deploying our "Contract Instance" by chaining the function ".deploy()".
                                                                                     // 4] It takes an "Object" as agrument which has two properties.
    }                                                                                // 5] "data" ---> This contains the 'bytecode' of our contract and 'arguments' ---> This contains any value which we want to pass to contructor of our contract.             
                                                                                     // 6] Again we are chaining this entire thing with ".send()" function. It also takes an object as an argument which has two properties.                              
    catch(err)                                                                       // 7] "from" ---> This is the account from which we want to deploy our contract and "gas"  ---> Amount of gas units we are willing to spend on this contract.                                         
    {                                                                                // Note : As we know that all our "web3" functions are asynchronous in nature and returns promise object, hence we are using async-await syntax.
        inbox = err;
    }        
})
 /*  Additional Information :-
 1] "web3" Library can interact with different technologies, here we are using "Ethereum" hence we are accessing ".eth" module and then its "Contract()" property.
 2] ".Contracts()" ----> It can be used to deploy a "Contract Instance" and also to interact with previously deployed contracts.
 3] The "interface" which our solidity compiler creates is in "JSON" format. We need to pass an actual "Javascript Object" and "JSON" to our Contract() function.
 4] Therefore we have used "JSON.parse()" to get back our Javascript Object.
 5] The value returned from all these is the direct reference to our "Inbox.sol" contract. Here we stored it inside "inbox".
 6] Now "inbox" is like the "Javascript Representation" of our contract.
 7] "inbox" ------> Represents what exits on the "Block-Chain". 
 6} We can call functions on "inbox" to interact with contract which exist on the blockchain.
 */




describe("Contract1 : Inbox",()=>{

    it("Test1 : Deploys a contract.",() => {
        assert.ok(inbox.options.address);              // 'inbox' Object has another object "options" which has property "address"
    })                                                 // assert.ok() -----> If 'address' exist then the test is passed, else if the address is 'undefinec' then test is failed.

    it("Test2 : Check Default Message", async () => {                                     // Two types of Smart Contract Functions :- 1] Calling a Function 2] Sending a Transtion.
        const message = await inbox.methods.message().call();                             // 1] Calling a Function  ---> Its relatively instantaneous and free. It is "Asynchrounous Function"
        assert.equal(message,"Swapnil");                                                  // 2] Sending a Trasction ---> It takes some amount of time and also cost money.  (Note :- Here we are calling a function.)
                                                                                          // 3] "methods" is the object inside our "inbox" object, its contains all the public functions that exists on our contract.        
                                                                                          // 4] Here we are calling the "message()" public function which is created by Solidity Compiler. As "message" is our public storage variable.
                                                                                          // 5] When we created an Instance of our Contract we have set the "message" as "Swapnil". Hence we can check it here using assert.equal().

    })

    it("Test3 : Modifying 'message' ", async () => {                                      // Here we are modifying the data on the blockchain
        await inbox.methods.setMessage("Parashare").send( { from : accounts[0] } );       // 1] Previous test we did ".call()" because we were "Calling a Function" -----> No Modification of data.
        const message = await inbox.methods.message().call();                             // 2] Here we did ".send()" because we are now "Sending a Transaction"    -----> We are modifying data present on the blockchain.
        assert.equal(message,"Parashare")                                                 // 3] ".send()" takes an object which has one property "from". It tell who is doing this transaction.                                                          
                                                                                          // 4] Now we will get the value of message and will check weather it is successfully modified or not.
    
    })
})   