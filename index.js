//we want to check for a window.ethereum (metamask) to make sure the user can connect to the blockchain.
//A wallet namely has a build in RPC relay to be able to contact the blockchain.
//Thus we always need the check for one.

/*
First connect function
async function connect() {
  if (typeof window.ethereum != "undefined") {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    //console.log("Connected")
    //next line of code turns the name of the button to the specified text.
    document.getElementById("connectButton").innerHTML = "Connected";
    //console.log("I see a metamask")
  } else {
    document.getElementById("connectButton").innerHTML =
      "Please install metamask";
  }
}
*/

//update connect function with QOL

import { ethers } from "./ethers-5.6.esm.min.js"
import { abi, contractAddress } from "./constants.js"

const connectButton = document.getElementById("connectButton")
const fundButton = document.getElementById("fundButton")
const balanceButton = document.getElementById("balanceButton")
balanceButton.onclick = balance
connectButton.onclick = connect
fundButton.onclick = fund

console.log(ethers)

async function balance() {
    if (typeof window.ethereum !== "undefined") {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const balance = await provider.getBalance(contractAddress)
            console.log(ethers.utils.formatEther(balance))
            //change the button into the actual balance
            document.getElementById("balanceButton").innerHTML =
                ethers.utils.formatEther(balance)
        } catch (error) {
            console.log(error)
        }
    } else {
        document.getElementById("balanceButton").innerHTML =
            "Please install metamask"
    }
}

async function connect() {
    if (typeof window.ethereum !== "undefined") {
        try {
            await ethereum.request({ method: "eth_requestAccounts" })
        } catch (error) {
            console.log(error)
        }
        document.getElementById("connectButton").innerHTML = "Connected"
        const accounts = await ethereum.request({ method: "eth_accounts" })
        console.log(accounts)
    } else {
        document.getElementById("connectButton").innerHTML =
            "Please install metamask"
    }
}

async function fund() {
    const ethAmount = document.getElementById("ethAmount").value
    console.log(`funding with ${ethAmount} ...`)
    if (typeof window.ethereum !== "undefined") {
        //provider / connection to the blockchain ==> RPC, built in in metamask
        // signer / wallet / someone with eth-gas ==> private key, built in in metamask
        //contract we are interacting with
        //  ABI - Address

        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        console.log(signer)
        const contract = new ethers.Contract(contractAddress, abi, signer)

        try {
            const txRespone = await contract.fund({
                value: ethers.utils.parseEther(ethAmount),
            })
            await listenForTransactionMine(txRespone, provider)
            console.log("done")
        } catch (error) {
            console.log(error)
        }
    }
}

function listenForTransactionMine(txRespone, provider) {
    console.log(`Mining ${txRespone.hash}...`)
    return new Promise((resolve, reject) => {
        provider.once(txRespone.hash, (txReceipt) => {
            console.log(
                `Completed with ${txReceipt.confirmations} confirmations`
            )
            resolve()
        })
    })
    // create a listener for the blockchain
}
