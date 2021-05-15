/* 
Note : 1] The purpose of compile.js is to compile the "Inbox.sol" i.e "Smart Contract" present inside 'contracts' folder.
       2] In order to get access of our "Index.sol" we would have used "require()" statment as we do in normal Node.js project.
          Eg : const contract1 = require('./contracts/Index.sol')
       3] Remember we can only use "Javascript" code using this method, but here we want to use "Solidity" code.
       4] So the correct way is as follows.
*/        

const path = require('path');
const fs = require('fs');
const solc = require('solc');

/* Why "path" module?

   1]We are using inbuilt "path" module rather than manually writing the path to achieve "Cross-Platform" operablity.
   2]So it doesn't matter whether this code is running on "Windows", "Linux" or "Mac".
   3]We can remain assured, this 'path' module will always generate a 'absolute' valid path for us.

 */

const inboxPath = path.resolve(__dirname,'contracts','Inbox.sol');             // It returns absolute path for our "Inbox.sol"

const source = fs.readFileSync(inboxPath,'utf-8');                             // Here we are reading our file content in an "Asynchronous" Manner. Now the "source" variable contains all our solidity code.

console.log(solc.compile(source,1));                                           // Here we are compiling our "Solidity" Smart Contract Code using Solidity compiler which we have included.