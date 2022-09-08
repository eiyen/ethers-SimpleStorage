// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

contract SimpleStorage {
    uint256 favoriteNumber;
    mapping(string => uint256) public nameToFavoriteNubmer;

    struct People {
        uint256 favoriteNumber;
        string name;
    }

    /* 
    Dynamic Array
        Syntax: [the type of the object] [the visibility of the object] [the variable name]; 
    */
    People[] public people;

    /* 
    Keyword: virtual
        virtual means the function can be overrided in a new contract that inherits this contract; 
    */
    function store(uint256 _favoriteNubmer) public virtual {
        favoriteNumber = _favoriteNubmer;
    }

    function retrieve() public view returns (uint256) {
        return favoriteNumber;
    }

    /* 
    Data Storage Keyward Comparison: storage, memory and calldata;
        Difference
            storage: permanetly stores a variable, and can't be used before a temporarily storing variable, such as function variable;
            memory: temporarily sotres a variable, and can be used before a function variable;
            calldata: temporarily sotres a read-only variable;
        Common
            Used before array and struct, and string is a special kind of array; 
    */
    function addPerson(string memory _name, uint256 _favoriteNumber) public {
        people.push(People(_favoriteNumber, _name));
        nameToFavoriteNubmer[_name] = _favoriteNumber;
    }
}
