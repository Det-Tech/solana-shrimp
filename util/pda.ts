import { PublicKey } from "@solana/web3.js";
import { SHRIMP_PROGRAM_ID } from "./../config";

export function findPlayerDataAcc(player: PublicKey): PublicKey {
    const [listingDataAcc, bump] = PublicKey.findProgramAddressSync(
        [player.toBuffer(), Buffer.from("shrimp")],
        SHRIMP_PROGRAM_ID
    );    

    return listingDataAcc
}

export function findGameDataAcc(): PublicKey {
    const [assetManager] = PublicKey.findProgramAddressSync(
        [Buffer.from("shrimp")],
        SHRIMP_PROGRAM_ID
    );
    return assetManager
}

export function findGameTreasuryAcc(): PublicKey {
    const [assetManager, bump] = PublicKey.findProgramAddressSync(
        [Buffer.from("shrimp_wallet")],
        SHRIMP_PROGRAM_ID
    );
    return assetManager
}