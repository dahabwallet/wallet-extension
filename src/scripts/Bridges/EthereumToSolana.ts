import {
  transferFromEthNative,
  tryNativeToUint8Array,
  parseSequenceFromLogEth,
  getEmitterAddressEth,
  getSignedVAA,
  getGovernorIsVAAEnqueued,
  ChainId,
  ChainName,
  redeemOnSolana,
  postVaaSolanaWithRetry,
} from "@certusone/wormhole-sdk";
import { signTransactionFactory } from "@certusone/wormhole-sdk/lib/cjs/solana";
import { ethers } from "ethers";
import { Signer, sendAndConfirmTransaction } from "@solana/web3.js";
const web3_sol = require("@solana/web3.js");
var Web3 = require("web3");

const WORMHOLE_RPC_HOSTS = ["https://wormhole-v2-testnet-api.certus.one"];
const solana_node = new web3_sol.Connection("https://api.devnet.solana.com");
let bs58 = require("bs58");
const EMITTER_ADDRESS_ETH = "0xF890982f9310df57d00f659cf4fd87e65adEd8d7";
const BRIDGE_ADDR_ETH = "0x706abc4E45D419950511e474C7B9Ed348A4a716c";
const GOERLI_INFURA_ENDPOINT =
  "https://goerli.infura.io/v3/2c429d4bb7e94ca6b78f8a61fdd5d58c";
const SOL_BRIDGE_ADDRESS = "3u8hJUVTA4jH1wYAyUur7FFZVQ8H635K3tSHHF4ssjQ5";
const SOL_TOKEN_BRIDGE_ADDRESS = "DZnkkTmCiFWfYTfT41X3Rd1kDgozqzxWaHqsw6W4x2oe";
const WETH_SOL_ADDRESS = "7VPWjBhCXrpYYBiRKZh1ubh9tLZZNkZGp2ReRphEV4Mc";

export interface GetSignedVAAWithRetryResult {
  vaaBytes: Uint8Array | undefined;
  isPending: boolean;
}

/// Utility function to get the signed VAA and retry if the return is none. The function stops when
/// the number of retries are reached or the vaa is returned :)
export const getSignedVAAWithRetry = async (
  emitterChain: ChainId | ChainName,
  emitterAddress: string,
  sequence: string,
  retryAttempts?: number
): Promise<GetSignedVAAWithRetryResult> => {
  let currentWormholeRpcHost = -1;
  const getNextRpcHost = () =>
    ++currentWormholeRpcHost % WORMHOLE_RPC_HOSTS.length;
  let attempts = 0;
  while (true) {
    attempts++;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const rpcHost = WORMHOLE_RPC_HOSTS[getNextRpcHost()];
    const results = await Promise.allSettled([
      getSignedVAA(rpcHost, emitterChain, emitterAddress, sequence),
      getGovernorIsVAAEnqueued(rpcHost, emitterChain, emitterAddress, sequence),
    ]);
    if (results[0].status === "fulfilled") {
      return { vaaBytes: results[0].value.vaaBytes, isPending: false };
    }
    if (results[1].status === "fulfilled" && results[1].value.isEnqueued) {
      return { vaaBytes: undefined, isPending: true };
    }
    if (retryAttempts !== undefined && attempts > retryAttempts) {
      throw new Error(results[0].reason);
    }
  }
};

/// Utility function to get the address we will send the WETH for
async function get_reciever_address(public_key_sol: String): Promise<string> {
  const user_sol_pubkey = new web3_sol.PublicKey(public_key_sol);
  const weth_sol_addr = new web3_sol.PublicKey(WETH_SOL_ADDRESS);
  const reciever_account = await solana_node.getTokenAccountsByOwner(
    user_sol_pubkey,
    {
      mint: weth_sol_addr,
    }
  );
  console.log(reciever_account.value[0].pubkey.toString());
  return reciever_account.value[0].pubkey.toString();
}

/// Function that redeems weth on Solana. It is called by the transfer function
async function redeem(
  tx: ethers.ContractReceipt,
  solana_private_key: string,
  solana_public_key: string
) {
  const sequence = parseSequenceFromLogEth(tx, BRIDGE_ADDR_ETH);
  const emitterAddress = getEmitterAddressEth(EMITTER_ADDRESS_ETH);
  const signedvaa = await getSignedVAAWithRetry(
    "ethereum",
    emitterAddress,
    sequence
  );
  console.log("SIGNED VAA", signedvaa);
  const user_sol_pubkey = new web3_sol.PublicKey(solana_public_key);
  let secretKey = bs58.decode(solana_private_key);

  const signer: Signer = {
    publicKey: user_sol_pubkey,
    secretKey,
  };
  const signer_factory = signTransactionFactory(signer);

  await postVaaSolanaWithRetry(
    solana_node,
    signer_factory,
    SOL_BRIDGE_ADDRESS,
    solana_public_key,
    Buffer.from(signedvaa.vaaBytes!),
    30
  );

  const redeem_transaction = await redeemOnSolana(
    solana_node,
    SOL_BRIDGE_ADDRESS,
    SOL_TOKEN_BRIDGE_ADDRESS,
    solana_public_key,
    signedvaa.vaaBytes!
  );

  await sendAndConfirmTransaction(solana_node, redeem_transaction, [signer]);
}

async function swap_eth_to_sol(
  to_transfer: number,
  eth_private_key: string,
  solana_public_key: string,
  solana_private_key: string
) {
  let signer = new ethers.Wallet(eth_private_key);

  const provider = new ethers.providers.JsonRpcProvider(GOERLI_INFURA_ENDPOINT);

  const amount = ethers.utils.parseUnits(to_transfer.toString(), "ether");
  signer = signer.connect(provider);

  const calculate_token_account = await get_reciever_address(solana_public_key);
  const target = tryNativeToUint8Array(calculate_token_account, "solana");

  const transfer_receipt = await transferFromEthNative(
    EMITTER_ADDRESS_ETH,
    signer,
    amount,
    1,
    target
  );
  redeem(transfer_receipt, solana_private_key, solana_public_key);
}

export default swap_eth_to_sol;
