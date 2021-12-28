"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CryptoJS = require("crypto-js");
class Block {
    constructor(index, hash, previousHash, data, timestamp) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}
Block.calculateHash = (index, previousHash, timestamp, data) => CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
Block.isValidStructure = (block) => typeof block.index === 'number' &&
    typeof block.hash === 'string' &&
    typeof block.previousHash === 'string' &&
    typeof block.data === 'string' &&
    typeof block.timestamp === 'number';
const genesisBlock = new Block(0, '202020200202', '', 'Hello', 123456789);
let blockChain = [genesisBlock];
const getBlockChain = () => blockChain;
const getLatestBlock = () => blockChain[blockChain.length - 1];
const getNewTimestamp = () => Math.round(new Date().getTime() / 1000);
const createNewBlock = (data) => {
    const prevBlock = getLatestBlock();
    const index = prevBlock.index + 1;
    const timestamp = getNewTimestamp();
    const hash = Block.calculateHash(index, prevBlock.hash, timestamp, data);
    const block = new Block(index, hash, prevBlock.hash, data, timestamp);
    return block;
};
const isBlockValid = (candidateBlock, previousBlock) => {
    const getHash = (block) => {
        return Block.calculateHash(block.index, block.previousHash, block.timestamp, block.data);
    };
    if (!Block.isValidStructure(candidateBlock)) {
        console.log('invalid structure');
        console.log(typeof candidateBlock.index);
        console.log(typeof candidateBlock.previousHash);
        console.log(typeof candidateBlock.hash);
        console.log(typeof candidateBlock.data);
        console.log(typeof candidateBlock.timestamp);
        return false;
    }
    else if (candidateBlock.index !== previousBlock.index + 1) {
        console.log('index error');
        return false;
    }
    else if (candidateBlock.previousHash !== previousBlock.hash) {
        console.log('prev hash error');
        return false;
    }
    else if (getHash(candidateBlock) !== candidateBlock.hash) {
        console.log('hash error');
        return false;
    }
    return true;
};
const addBlock = (candidateBlock) => {
    if (isBlockValid(candidateBlock, getLatestBlock())) {
        blockChain.push(candidateBlock);
    }
};
addBlock(createNewBlock('world'));
addBlock(createNewBlock('node.js'));
console.log(blockChain);
//# sourceMappingURL=index.js.map