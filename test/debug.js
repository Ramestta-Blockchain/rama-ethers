const { use, POSClient, Converter, utils } = require("@ramestta/ramajs");
const { Web3ClientPlugin } = require("@ramestta/rama-ethers");
const { user1, rpc, pos } = require("./config");
const { providers, Wallet } = require("ethers");

const dotenv = require('dotenv');
dotenv.config();

use(Web3ClientPlugin);
const from = process.env.FROM || user1.address;

const execute = async () => {


    // return console.log(Converter.toHex('10'), new utils.BN('10').toString(16))

    const privateKey = process.env.PRIVATE_KEY || user1.privateKey;
    const ramesttaERC20 = pos.child.erc20;
    const mumbaiERC20 = pos.parent.erc20;
    const rootRPC = process.env.ROOT_RPC || rpc.parent;
    const ramesttaRPC = process.env.RAMESTTA_RPC || rpc.child;

    const parentPrivder = new providers.JsonRpcProvider(rootRPC);
    const childProvider = new providers.JsonRpcProvider(ramesttaRPC);

    const ramestta = new POSClient({
        log: true,
        network: 'testnet',
        version: 'v1',
        parent: {
            provider: new Wallet(privateKey, parentPrivder),
            defaultConfig: {
                from
            }
        },
        child: {
            provider: new Wallet(privateKey, childProvider),
            defaultConfig: {
                from
            }
        }
    });

    await ramestta.init();

    //   return console.log(await ramestta.isDeposited('0xc67599f5c967f2040786d5924ec55d37bf943c009bdd23f3b50e5ae66efde258'));


    const rootTokenErc20 = ramestta.erc20(mumbaiERC20, true);
    const ramesttaTokenErc20 = ramestta.erc20(ramesttaERC20);

    const result = await rootTokenErc20.approveMax({
        maxPriorityFeePerGas: 2000000000,

    });
    // const result = await ramesttaTokenErc20.withdrawStart(10);
    const txHash = await result.getTransactionHash();
    console.log("txHash", txHash);
    console.log("receipt", await result.getReceipt());

    return;

    const payload = await ramestta.exitUtil.buildPayloadForExit(
        '0x1c20c41b9d97d1026aa456a21f13725df63edec1b1f43aacb180ebcc6340a2d3',
        '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
        false
    )
    return console.log("payload", "length", payload.length);
    // const txHash = await result.getTransactionHash();
    // console.log("txHash", txHash);
    // console.log("receipt", await result.getReceipt());

    const isCheckpointed = await ramesttaTokenErc20.isWithdrawExited(
        '0xbb9051c6a55ad82122835dd6b656f62f2bf905452e844172f9d8ba6a98137f8c'
    );
    console.log("isWithdrawExited", isCheckpointed);

    const balanceRoot = await ramesttaTokenErc20.getBalance(from)
    console.log('balanceRoot', balanceRoot);
}

execute().then(_ => {
    process.exit(0)
}).catch(err => {
    console.error("error", err);
    process.exit(0);
})
