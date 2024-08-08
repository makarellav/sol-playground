import {airdropOnLowBalance, loadKeypairFromEnv} from "./helpers";
import {clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey} from "@solana/web3.js";

(async () => {
    const keypair = loadKeypairFromEnv("SECRET_KEY");

    const connection = new Connection(clusterApiUrl("devnet"));

    console.log("✅ Connected!");

    const address = new PublicKey(keypair.publicKey.toBase58());
    const balance = await connection.getBalance(address);
    const balanceInSOL = balance / LAMPORTS_PER_SOL;

    const newBalance = await airdropOnLowBalance(connection, keypair, true);

    console.log(`Old balance: ${balance}`);
    console.log(`New balance: ${newBalance}`);

    console.log(`The balance of the account at ${address} is ${balanceInSOL} SOL`);
    console.log(`✅ Finished!`);
})();

