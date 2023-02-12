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

async function connect() {
  if (typeof window.ethereum !== "undefined") {
    try {
      await ethereum.request({ method: "eth_requestAccounts" });
    } catch (error) {
      console.log(error);
    }
    document.getElementById("connectButton").innerHTML = "Connected";
    const accounts = await ethereum.request({ method: "eth_accounts" });
    console.log(accounts);
  } else {
    document.getElementById("connectButton").innerHTML =
      "Please install metamask";
  }
}
