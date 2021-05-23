// SPDX-License-Identifier: MIT
pragma solidity >=0.4.26;                                        // Specifies Solidity Version. Suggested by Sir :- 0.4.17, but I am using 0.4.26

contract Inbox                                                  // Keyword : "Contract" is similar to Keyword : "Class" which we used while creating classes.
{                                                               // "Contracts" are similar to "Classes" and deployed version of these contracts is similar to instarces(i.e Objects)
   
    string public message;                                      /* This is storage variable, it exits for life of the contract.
                                                                   "Storage variable" is one which gets stored with the smart contract on the "Blockchain"
                                                                   "Local variable" are one-time created when the contract is executed and thrown away at the end.
                                                                   They are not persisted on the Blockchain.
                                                                   
                                                                   Note : When storage variable are marked as public
                                                                          The Solidity Compiler creates a function out of it with the same name as that of variable.
                                                                          Whenever the funciton is called the variable value is returned.
                                                                */
 
    constructor(string memory Initial_message)                 // Constructor of our "Contract". Important Note : 1]"Visibility ( public / external ) is not needed for constructors anymore.                                                                   
    {                                                          //                                                 2] To prevent a contract from being created, it can be marked abstract. 
        message = Initial_message;                             //                                                 3] This makes the visibility concept for constructors obsolete."
    }
    
    function setMessage(string memory New_message) public             // Setter Function
    {
        message = New_message;
    }
    
    function getMessage() public view returns (string memory){               // Getter Function          (We don't actually need it, as "message" is a public storage varible, so compiler will create a function which returns its value. )
        return message;
    }
     
}

