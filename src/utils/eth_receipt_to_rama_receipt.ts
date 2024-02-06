import { ITransactionReceipt } from "@ramestta/ramajs";
import { providers } from "ethers";

export const ethReceiptToRamaReceipt = (receipt: providers.TransactionReceipt) => {

    const ramaReceipt: ITransactionReceipt = receipt as any;

    ramaReceipt.gasUsed = receipt.gasUsed.toNumber();
    ramaReceipt.cumulativeGasUsed = receipt.cumulativeGasUsed.toNumber();

    return ramaReceipt;
};
