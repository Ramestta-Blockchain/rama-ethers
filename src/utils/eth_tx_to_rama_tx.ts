import { IBlock, ITransactionData, ITransactionResult } from "@ramestta/ramajs";
import { providers } from "ethers";

export const ethTxToRamaTx = (tx: providers.TransactionResponse) => {
    const ramaTx: ITransactionData = tx as any;
    ramaTx.gasPrice = tx.gasPrice.toString();
    ramaTx.gas = tx.gasLimit.toNumber();
    (ramaTx as any).gasLimit = tx.gasLimit.toNumber();
    ramaTx.value = tx.value.toString();
    ramaTx.transactionHash = tx.hash;

    return ramaTx;
};
