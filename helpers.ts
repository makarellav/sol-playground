import "dotenv/config";
import {Connection, Keypair, LAMPORTS_PER_SOL} from "@solana/web3.js";

export function loadKeypairFromEnv(envKey: string) {
    const data = process.env[envKey];

    if (!data) {
        throw new Error("Wrong environment key");
    }

    const bytes = JSON.parse(data);

    return Keypair.fromSecretKey(new Uint8Array(bytes));
}

export async function airdropOnLowBalance(connection: Connection, keypair: Keypair, forceAirdrop = false) {
    const balance = await connection.getBalance(keypair.publicKey);

    const minBalanceToAirdrop = LAMPORTS_PER_SOL / 2;

    if (balance < minBalanceToAirdrop || forceAirdrop) {
        await connection.requestAirdrop(keypair.publicKey, LAMPORTS_PER_SOL).then((sig) => {
            console.log(`✅ Airdrop received: ${sig}`);
        });
    }

    return await connection.getBalance(keypair.publicKey);
}