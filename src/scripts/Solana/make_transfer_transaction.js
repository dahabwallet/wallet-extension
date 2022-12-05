import * as buffer from "buffer";
import {
  Keypair,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
  sendAndConfirmTransaction,
  Connection,
  clusterApiUrl,
  PublicKey,
} from "@solana/web3.js";

const send_transaction = async (sender_priv_key, receiver_pub_key, amount) => {
  window.Buffer = buffer.Buffer;

  const connection = new Connection(clusterApiUrl("devnet"));
  const toPublicKey = new PublicKey(receiver_pub_key);

  sender_priv_key = sender_priv_key.split(",").map((str) => Number(str));
  let fromKeypair = Keypair.fromSecretKey(Uint8Array.from(sender_priv_key));

  let transaction = new Transaction();
  transaction.add(
    SystemProgram.transfer({
      fromPubkey: fromKeypair.publicKey,
      toPubkey: toPublicKey,
      lamports: LAMPORTS_PER_SOL * amount,
    })
  );

  await sendAndConfirmTransaction(connection, transaction, [fromKeypair]);
};

export default send_transaction;
