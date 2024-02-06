if (process.env.NODE_ENV === 'production') {
    module.exports = require('./rama-ethers.node.min.js')
} else {
    module.exports = require('./rama-ethers.node.js')
}
