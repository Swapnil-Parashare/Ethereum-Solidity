const HDWalletProvider = require('truffle-hdwallet-provider')           // Importing the 'provider' which we have installed.
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');


// Setting up our provider
const provider = new HDWalletProvider(
    'scare around almost clutch spirit stairs scan trumpet poverty fetch wool exist',         // 1]This is 12 words 'mneumonic' for unlocking our account.
    'https://rinkeby.infura.io/v3/ec2a5eddab6d4046a0f8ef8f7db57754'                           // 2]This is Rinkeby Network endpoint to which we want to connect. We have obtain this by signing up in Infura and creating a project.
)                                                                                             // 3]Here we are actually connecting to the "Infura-Node" which is present inside Rinkeby Network.
                                                                                              // Note : We can use modules like "Geth" we setup our own ethereum node on our local machine inorder to connect to these networks.
                                                                                              //        But it is quite complex. Therefore we using the node provided by "Infura" to connect to these network.

// Creating instance of "web3.js" and giving the provider.
const web3 = new Web3(provider);


// Below code is similar to our "beforeEach" of our "Inbox.test.js" file

const deploy = async () => {              
                                                 // We are creating this function just to use async-await syntax. We cannot use 'await' outside the 'async' function.
    const accounts = await web3.eth.getAccounts();

    console.log(`Contract is deployed from Account : ${accounts[0]}`);

    const result = await new web3.eth.Contract(JSON.parse(interface))
                  .deploy( { data : bytecode, arguments : ["Swapnil"] } )
                  .send( { from : accounts[0], gas : 1000000});

    console.log(`Contract is deployed at : ${result.options.address}`);

}
deploy();        // Invoking our async-function.

/*
Note : 1] Now we have deployed our contract to "Rinkeby Test Network" Successfully
       2] We can see it at "rinkeby.ethereum.io" by searching our "Contract's Address".
       3] We have also connected our "Remix Tool" with "Metamask" by granting some permissions.
       4] So now we interact with our contract through "Remix Tool".
       5] We connect Remix to our local machine for our convinince(as usual).
       6] Now we also change Environment from JavaScript VM to Injected Web3.
       7] Then we paste our "Contract's Address" and interact with it.
       8] Now it will take some time to process as things are happening on Rinkeby Test Network.

IMP : Lecture 63 gives very nice revision of entire Section : 2.
*/