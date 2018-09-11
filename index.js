/*var Web3 = require('web3')
//web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
abi = JSON.parse('[{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]')
Voting = web3.eth.contract(abi);
console.log(Voting)
// In nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
contractInstance = Voting.at('0x7ae9b16c6e53b655c70a5dbdd40391886d2ca753');
console.log(contractInstance)
//candidates = {"Rama": "candidate-1", "Nick": "candidate-2", "Jose": candidate-3"}
 /* When you compile and deploy your Voting contract,
 * truffle stores the abi and deployed address in a json
 * file in the build directory. We will use this information
 * to setup a Voting abstraction. We will use this abstraction
 * later to create an instance of the Voting contract.
 * Compare this against the index.js from our previous tutorial to see the difference
 * https://gist.github.com/maheshmurthy/f6e96d6b3fff4cd4fa7f892de8a1a1b4#file-index-js
 */
// Import the page's CSS. Webpack will know what to do with it.
//import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'

/*
 * When you compile and deploy your Voting contract,
 * truffle stores the abi and deployed address in a json
 * file in the build directory. We will use this information
 * to setup a Voting abstraction. We will use this abstraction
 * later to create an instance of the Voting contract.
 * Compare this against the index.js from our previous tutorial to see the difference
 * https://gist.github.com/maheshmurthy/f6e96d6b3fff4cd4fa7f892de8a1a1b4#file-index-js
 */

import myerc721_artifacts from './build/contracts/MyERC721.json'

var MyERC721 = contract( myerc721_artifacts);

// let candidates = {"Rama": "candidate-1", "Nick": "candidate-2", "Jose": "candidate-3"}


window.buyToken = function(_type,_title, _description) {
  let Tokenid = $("_type").val();
  let TokenName = $("_title").val();
  let TokenDesc = $("_description").val();
  let tokeninfo={"_type":Tokenid,"_title":TokenName,"_description":TokenDesc}
  // console.log(tokeninfo)
  try {
    $("#msg").html("token has been submi1tted")
    // $("# _type").val("");
    // alert (MyERC721)
    /* Voting.deployed() returns an instance of the contract. Every call
     * in Truffle returns a promise which is why we have used then()
     * everywhere we have a transaction call
     */
    MyERC721.deployed().then(function(contractInstance) {
      console.log(contractInstance)
      var val1=Number(document.getElementById("_type").value);
      //alert(val1);
      var val2=document.getElementById("_title").value;
      var val3=document.getElementById("_description").value;
      

    
      contractInstance.buyToken(val1,val2,val3, {gas: 400000, from: web3.eth.accounts[0]}).then(function() {
        // let div_id = candidates[candidateName];
        return contractInstance.viewToken(val1).then(function(v) {
          // alert ("done1")
          console.log("hiiiii--------",v.toString())
          // alert(v.toString())
          // $("#" + div_id).html(v.toString());
          $("#msg").html("");
      
        });
      });
    });
  } catch (err) {
    console.log(err);
  }
  // alert ("done")
}

$( document ).ready(function() {
  // alert ("ready")
  if (typeof web3 !== 'undefined') {
    console.log("Using web3 detected from external source like Metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.log("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
  }
  console.log(window.web3)
  MyERC721.setProvider(web3.currentProvider);
  

  // let candidateNames = Object.keys(tokeninfo);
  // for (var i = 0; i < candidateNames.length; i++) {
  //   let name = candidateNames[i];
  //   Voting.deployed().then(function(contractInstance) {
  //     contractInstance.totalVotesFor.call(name).then(function(v) {
  //       $("#" + candidates[name]).html(v.toString());
  //     });
  //   })
  // }
});
