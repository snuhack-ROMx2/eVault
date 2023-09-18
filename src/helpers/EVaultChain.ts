import { BlockType, ChainErrors } from "../../types";
import Block from "./Block.js";

export default class EVaultChain {
    public static eVault = new EVaultChain();

    chain: Block[] = [];
    chainImpureCb: ((impureBlockNext: Block, impureBlockPrev: Block) => void) | null = null;

    constructor() {
        if (this.chain.length !== 0) return;

        const genesisBlock = new Block({
            heading: "Genesis",
            details: "--N/A--",
            fileName: "--N/A--",
            prevBlockHash: "--N/A--",
            nonce: 0
        });

        this.chain.push(genesisBlock);
    }

    addBlock(blockData: BlockType): true | ChainErrors {

        /*
            - Detect if chain has been altered anywhere,
            - if impure, no more blocks can be added unless the issue is fixed,
            - its illegal to alter any block.
        */
        let isImpure = false;
        for (let i = 1; i < this.chain.length; i++) {
            if (this.chain[i].data.prevBlockHash !== this.chain[i - 1].hash)
                isImpure = true;

            if (isImpure) {
                if (this.chainImpureCb)
                    this.chainImpureCb(this.chain[i],  this.chain[i - 1]);

                return "[error: chain impure (breach suspected)]";
            }
        }

        const block = new Block(blockData);
        const prevBlockHash = this.chain[this.chain.length - 1].hash;
        
        if (block.hash !== prevBlockHash)
            return "[rejected: invalid previous block]";
        
        if (!this.hashDesignIsValid(block.hash))
            return "[rejected: invalid hash]";

        this.chain.push(block);
        return true;
    }

    hashDesignIsValid(hash: string) {
        const validator = new RegExp('^00000', 'g');
        return validator.test(hash);
    }
}