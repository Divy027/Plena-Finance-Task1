import { ethers } from 'hardhat';
import 'dotenv/config';
async function main() {
  const [deployer] = await ethers.getSigners();

  console.log('Deploying TargetContract with deployer address:', deployer.address);

  // Deploy TargetContract
  const targetContract: any = await ethers.deployContract("TargetContract",);

  await targetContract.waitForDeployment();

  console.log('TargetContract deployed to:', targetContract.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
