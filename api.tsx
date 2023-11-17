import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Connection,
} from "@solana/web3.js";
import { SHRIMP_PROGRAM_ID, DEV_WALLET } from "./config";
import { Program, web3 } from "@project-serum/anchor";
import * as anchor from "@project-serum/anchor";

import idl from "./idl.json";
import {
  findPlayerDataAcc,
  findGameTreasuryAcc,
  findGameDataAcc,
} from "./util/pda";

const idlData: any = idl;

const getProvider = async (connection: Connection, wallet: any) => {
  const provider = new anchor.AnchorProvider(
    connection,
    wallet,
    anchor.AnchorProvider.defaultOptions()
  );
  return provider;
};

export const initialize = async (
  connection: any,
  wallet: any
) => {
  try {
    console.log("initialize starting...");
    console.log(connection, wallet)
    const provider: any = await getProvider(connection, wallet);
    let program = new Program(idlData, SHRIMP_PROGRAM_ID, provider);
    const gameStateAccount: PublicKey = await findGameDataAcc();
    const gameTreasuryAccount: PublicKey = await findGameTreasuryAcc();
    
    // const tx = await program.rpc.initialize(
    //   new anchor.BN(8640000000),
    //   new anchor.BN(1e9),
    //   DEV_WALLET,
    //   {
    //     accounts: {
    //       gameStateAccount: gameStateAccount,
    //       dev: provider.wallet.publicKey,
    //       treasuryAccount: gameTreasuryAccount,
    //       systemProgram: web3.SystemProgram.programId,
    //     },
    //   }
    // );

    const tx = await program.methods.initialize(new anchor.BN(8640000000), new anchor.BN(1e9), DEV_WALLET)
    .accounts({
      gameStateAccount: gameStateAccount,
      dev: provider.wallet.publicKey,
      treasuryAccount: gameTreasuryAccount,
      systemProgram: SystemProgram.programId,
    })
    .rpc();

    console.log("Your transaction signature: ", tx);
    console.log("initialize finished");
    return { success: true };
  } catch (error: any) {
    console.log(error);
    console.log("error: initialize Skip");
    return { success: false };
  }
};

export const buyEggs = async (
  connection: Connection,
  wallet: any,
  buyAmount: any,
  referAccount: any
) => {
  try {
    console.log("buyEggs starting...");
    const provider = await getProvider(connection, wallet);
    let program = new Program(idlData, SHRIMP_PROGRAM_ID, provider);

    let testWallet = anchor.web3.Keypair.generate();

    let referr;

    if (!referAccount?.refer || referAccount?.refer == provider.wallet.publicKey.toBase58()){
      referr = testWallet.publicKey; // need to check and replace referr
    } else{
      referr = new PublicKey(referAccount?.refer)
    }

    const gameStateAccount: PublicKey = await findGameDataAcc();
    const refStateAccount: PublicKey = await findPlayerDataAcc(testWallet.publicKey);
    const playerAccount: PublicKey = await findPlayerDataAcc(provider.wallet.publicKey);
    const gameTreasuryAccount: PublicKey = await findGameTreasuryAcc();

    const amount =  new anchor.BN(LAMPORTS_PER_SOL * buyAmount); // new anchor.BN(10e9); // 10 SOL
    const tx = await program.rpc.buyShrimp(amount, referr, {
      accounts: {
        player: provider.wallet.publicKey,
        playerStateAccount: playerAccount,
        referrerStateAccount: refStateAccount,
        gameStateAccount: gameStateAccount,
        devWallet: DEV_WALLET,
        referrerAccount: testWallet.publicKey,
        treasuryAccount: gameTreasuryAccount,
        systemProgram: SystemProgram.programId,
      },
    });
    console.log("Your transaction signature: ", tx);
    return { success: true };
  } catch (err: any) {
    console.log(err);
    console.log("error: buyEggs Skip");
    return { success: false };
  }
};

export const sellEggs = async (
  connection: Connection,
  wallet: any
) => {
  try {
    console.log("sellEggs starting...");
    const provider = await getProvider(connection, wallet);
    let program = new Program(idlData, SHRIMP_PROGRAM_ID, provider);

    const gameStateAccount: PublicKey = await findGameDataAcc();
    const playerAccount: PublicKey = await findPlayerDataAcc(provider.wallet.publicKey);
    const gameTreasuryAccount: PublicKey = await findGameTreasuryAcc();

    const tx = await program.rpc.updateFee({
      accounts: {
        player: provider.wallet.publicKey,
        playerAccount: playerAccount,
        gameStateAccount: gameStateAccount,
        devWallet: DEV_WALLET,
        treasuryAccount: gameTreasuryAccount,
        systemProgram: SystemProgram.programId,
      },
    });
    console.log("Your transaction signature: ", tx);
    return { success: true };
  } catch (err: any) {
    console.log(err.message);
    console.log("error: sellEggs Skip");
    return { success: false };
  }
};

export const hatchEggs = async (
  connection: Connection,
  wallet: any
) => {
  try {
    console.log("hatchEggs starting...");
    const provider = await getProvider(connection, wallet);
    let program = new Program(idlData, SHRIMP_PROGRAM_ID, provider);

    const gameStateAccount: PublicKey = await findGameDataAcc();
    const playerAccount: PublicKey = await findPlayerDataAcc(provider.wallet.publicKey);

    const tx = await program.methods.hatchEggs({
      accounts: {
        playerAccount: playerAccount,
        gameStateAccount: gameStateAccount,
      },
    });
    console.log("Your transaction signature: ", tx);
    return { success: true };
  } catch (err: any) {
    console.log(err?.message);
    console.log("error: hatchEggs Skip");
    return { success: false };
  }
};
