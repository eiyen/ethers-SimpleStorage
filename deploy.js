/* 
CLI
    How to run this file: node deploy.js 

yarn
    1. yarn can be used to install packages through "yarn add package", and to run scripts through "yarn package (options)".
*/

/* Package Import */
require("dotenv").config()
const ethers = require("ethers")
const fs = require("fs")

/* Main Funcion */
async function main() {
  
    /* Prepare for function factory */
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL)
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
    const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8")
    const binary = fs.readFileSync(
        "./SimpleStorage_sol_SimpleStorage.bin",
        "utf8"
    )

    /* Deploy contract */
    const contractFactory = new ethers.ContractFactory(abi, binary, wallet)
    console.log("Deploying Contract...")
    const contract = await contractFactory.deploy()
    await contract.deployTransaction.wait() // Get INITCODE transaction receipt.
    console.log("Deployed!")
    console.log(`The contract address is: ${contract.address}`)

    /* Interact with contract */
    console.log("Storing favorite number...")
    const transactionResponse = await contract.store("8")
    await transactionResponse.wait() // Get transaction receipt.
    console.log("Stored!")
    console.log("Retrieve favorite number...")
    const favoriteNumber = await contract.retrieve()
    console.log("Retrieved!")
    console.log(`The favorite nubmer is: ${favoriteNumber}`)
}

/* Executor Funcion */
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
