require('dotenv').config()
const Web3 = require('web3');

const HDWalletProvider = require('@truffle/hdwallet-provider');
const mnemonic = process.env.MNEMONIC;
const clientURL = `https://rpc-mumbai.maticvigil.com`;
const provider = new HDWalletProvider(mnemonic,clientURL);
const web3 = new Web3(provider);
const data = require('../build/contracts/mintContract.json');
const abiArray = data.abi;
const contract_address = process.env.CONTRACT_ADDRESS;

const deploy = async() => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account ', accounts[0]);

    const contract = await new web3.eth.Contract(abiArray,contract_address);
    const tokenURI = 'https://ipfs.io/ipfs/QmUYS3Hfa1X95YN3f459K67iprfUbY3TaaYbyQgnk9v7fR';
    await contract.methods.mintNFT(tokenURI).send({from : accounts[0], gas: '1000000'});

    console.log('Yah! NFT minted successfully');
}

deploy();