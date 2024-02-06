// const dotenv = require('dotenv');
// const path = require('path');
// const env = dotenv.config({
//     path: path.join(__dirname, '.env')
// });
module.exports = {
    rpc: {
        parent: process.env.ROOT_RPC,
        child: process.env.RAMESTTA_RPC || 'https://testnet.ramestta.com',
    },
    pos: {
        parent: {
            erc20: '0x1eB6956E6c5F27d822FC34DF076f38e6535fA079',
            erc721: '',
            erc1155: '',
            chainManagerAddress: '', // Address of RootChainManager proxy for POS Portal
        },
        child: {
            erc20: '0x0000000000000000000000000000000000001010',
            erc721: '',
            weth: '',
            erc1155: '',
        },
    },
    user1: {
        "privateKey": process.env.USER1_PRIVATE_KEY,
        "address": process.env.USER1_FROM
    },
    user2: {
        address: process.env.USER2_FROM, // Your address
        "privateKey": process.env.USER2_PRIVATE_KEY,
    },
}
