import { ITransactionRequestConfig, IPlugin, ITransactionResult, Converter, utils } from "@ramestta/ramajs";
import { BigNumber, ethers } from "ethers";
import { EtherWeb3Client } from "./ethers";
import { RamaBigNumber } from "./utils";


export class Web3ClientPlugin implements IPlugin {
    setup(rama) {
        rama.utils.Web3Client = EtherWeb3Client as any;
        rama.utils.BN = RamaBigNumber;
        rama.utils.isBN = (value) => {
            return BigNumber.isBigNumber(value);
        };
    }
}

export * from "./ethers";

/* tslint:disable-next-line */
export default Web3ClientPlugin;