import * as CryptoJS from "crypto-js";

class Block {
  static calculateHash = (
    index: number,
    previousHash: string,
    timestamp: number,
    data: string
  ): string =>
    CryptoJS.SHA256(index + previousHash + timestamp + data).toString();

  static isValidStructure = (block: Block): boolean =>
    typeof block.index === "number" &&
    typeof block.hash === "string" &&
    typeof block.previousHash === "string" &&
    typeof block.data === "string" &&
    typeof block.timestamp === "number";

  public index: number;
  public hash: string;
  public previousHash: string;
  public data: string;
  public timestamp: number;

  constructor(
    index: number,
    hash: string,
    previousHash: string,
    data: string,
    timestamp: number
  ) {
    this.index = index;
    this.hash = hash;
    this.previousHash = previousHash;
    this.data = data;
    this.timestamp = timestamp;
  }
}

const genesisBlock: Block = new Block(
  0,
  "202020200202",
  "",
  "Hello",
  123456789
);

let blockChain: Block[] = [genesisBlock];

const getBlockChain = (): Block[] => blockChain;

const getLatestBlock = (): Block => blockChain[blockChain.length - 1];

const getNewTimestamp = (): number => Math.round(new Date().getTime() / 1000);

const createNewBlock = (data: string): Block => {
  const prevBlock: Block = getLatestBlock();
  const index: number = prevBlock.index + 1;
  const timestamp: number = getNewTimestamp();
  const hash = Block.calculateHash(index, prevBlock.hash, timestamp, data);
  const block: Block = new Block(index, hash, prevBlock.hash, data, timestamp);

  return block;
};

const isBlockValid = (candidateBlock: Block, previousBlock: Block): boolean => {
  const getHash = (block: Block): string => {
    return Block.calculateHash(
      block.index,
      block.previousHash,
      block.timestamp,
      block.data
    );
  };

  if (!Block.isValidStructure(candidateBlock)) {
    return false;
  } else if (candidateBlock.index !== previousBlock.index + 1) {
    return false;
  } else if (candidateBlock.previousHash !== previousBlock.hash) {
    return false;
  } else if (getHash(candidateBlock) !== candidateBlock.hash) {
    return false;
  }

  return true;
};

const addBlock = (candidateBlock: Block): void => {
  if (isBlockValid(candidateBlock, getLatestBlock())) {
    blockChain.push(candidateBlock);
  }
};

addBlock(createNewBlock("world"));
addBlock(createNewBlock("node.js"));

console.log(blockChain);

export {};
