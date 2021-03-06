var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;

var Block = new Schema(
{
    "number": {type: Number, index: {unique: true}},
    "hash": String,
    "parentHash": String,
    "nonce": String,
    "sha3Uncles": String,
    "logsBloom": String,
    "transactionsRoot": String,
    "stateRoot": String,
    "receiptRoot": String,
    "coinbase": String,
    "difficulty": String,
    "totalDifficulty": String,
    "size": Number,
    "extraData": String,
    "gasLimit": Number,
    "gasUsed": Number,
    "timestamp": Number,
    "blockTime": Number,
    "uncles": [String],
    "transactions":Number
});

var Account = new Schema(
{
    "address": {type: String, index: {unique: true}},
    "balance": Number,
    "blockNumber": Number,
    "type": Number // address: 0x0, contract: 0x1
});

var Contract = new Schema(
{
    "address": {type: String, index: {unique: true}},
    "creationTransaction": String,
    "contractName": String,
    "compilerVersion": String,
    "optimization": Boolean,
    "sourceCode": String,
    "abi": String,
    "byteCode": String,
    "templateAddress":String
}, {collection: "Contract"});

var Template = new Schema({
    "address":{type:String,index:{unique:true}},
    "coinBase":String,
    "templateName":String,
    "compilerVersion":String,
    "compilerOption":String,
    "sourceCode":String,
    "abi":String,
    "byteCode":String,
    "instance":Array
},{collection: "Template"})

var Transaction = new Schema(
{
    "hash": {type: String, index: {unique: true}},
    "nonce": Number,
    "blockHash": String,
    "blockNumber": Number,
    "transactionIndex": Number,
    "from": String,
    "to": String,
    "value": String,
    "gas": Number,
    "gasPrice": String,
    "timestamp": Number,
    "input": String,
    "cumulativeGasUsed":Number,
    "gasUsed":Number,
    "contractAddress":String,
    "logs":Array,
    "status":String,
    "type":Number,
    "endorseTxList":Array,
    "gasDeveloper":Number,
    "gasMiner":Number,
    "templateAddress":String,
    "txType":String
}, {collection: "Transaction"});

var BlockStat = new Schema(
{
    "number": {type: Number, index: {unique: true}},
    "timestamp": Number,
    "difficulty": String,
    "hashrate": String,
    "txCount": Number,
    "gasUsed": Number,
    "gasLimit": Number,
    "miner": String,
    "blockTime": Number,
    "uncleCount": Number
});

var Uncle = new Schema({
  "number": {type: Number, index: {unique: true}},
  "hash": String,
  "parentHash": String,
  "nonce": String,
  "sha3Uncles": String,
  "position":Number,
  "blockNumber":Number,
  "blockHash":String,
  "logsBloom": String,
  "transactionsRoot": String,
  "stateRoot": String,
  "receiptRoot": String,
  "miner": String,
  "difficulty": String,
  "totalDifficulty": String,
  "size": Number,
  "extraData": String,
  "gasLimit": Number,
  "gasUsed": Number,
  "timestamp": Number,
  "blockTime": Number,
  "uncles": [String]
});
// create indices
Transaction.index({timestamp:-1});
Transaction.index({blockNumber:-1});
Transaction.index({from:1, blockNumber:-1});
Transaction.index({to:1, blockNumber:-1});
Account.index({balance:-1});
Account.index({balance:-1, blockNumber:-1});
Block.index({miner:1});
Block.index({miner:1, blockNumber:-1});
Uncle.index({miner:1});
Uncle.index({miner:1, blockNumber:-1});


mongoose.model('BlockStat', BlockStat);
mongoose.model('Block', Block);
mongoose.model('Account', Account);
mongoose.model('Contract', Contract);
mongoose.model('Transaction', Transaction);
mongoose.model('Uncle', Uncle);
mongoose.model('Template', Template);
module.exports.BlockStat = mongoose.model('BlockStat');
module.exports.Block = mongoose.model('Block');
module.exports.Contract = mongoose.model('Contract');
module.exports.Transaction = mongoose.model('Transaction');
module.exports.Account = mongoose.model('Account');
module.exports.Uncle = mongoose.model('Uncle');
module.exports.Template = mongoose.model('Template');

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/blockDB');

// mongoose.set('debug', true);
