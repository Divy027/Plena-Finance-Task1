import {ethers} from "hardhat";
import ABI1 from "../constants/TestContract.json"
import ABI2 from "../constants/TargetContract.json";

const testContractAddress = '0x735847a92B56F87F06584EcCBecaC7ccc40C94DC'; // contract whose state will change
const targetContractAddress = '0xeb298fF588037e977828DcC480fA45221249E4a9';// contract whose code will execute 

async function main() {
  try {
    const provider =  ethers.provider;

    const testContractABI = ABI1;
    const targetContractABI = ABI2;

    const [signer] = await ethers.getSigners();

    console.log("Preparing function call data ....");
    // Prepare _payload data
    const targetContract = new ethers.Contract(targetContractAddress, targetContractABI, provider);
    const withdrawToFunction:any = targetContract.interface.getFunction('transferFunds');
    const withdrawToData = targetContract.interface.encodeFunctionData(withdrawToFunction, ['0x7D207CBdEbB93f90101cF0A9BF464b092e2C5c87']);

    console.log("calling transferFunds....");
    const testContract: any = new ethers.Contract(testContractAddress, testContractABI, provider);
    const tx = await testContract.connect(signer).transferFunds( 
      targetContractAddress,
      withdrawToData
    );

    const receipt = await tx.wait();
    console.log('Transaction receipt:', receipt);
  } catch (error) {
    console.error('Error:', error);
  }
}

main(); 
