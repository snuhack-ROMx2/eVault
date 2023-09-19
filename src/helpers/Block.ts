import { createHash } from "crypto";
import { BlockType } from "../../types";
import { v4 } from 'uuid';

export default class Block {
    id: string
    data: BlockType;
    timestamp: number;
    prevBlockHash: string;
    nonce = 0;

    constructor(data: BlockType, prevBlockHash: string) {
        this.id = v4();
        this.data = data;
        this.timestamp = Date.now();
        this.prevBlockHash = prevBlockHash;
    }

    get hash() {
        const blockStr = JSON.stringify(this);
        const hash = createHash('SHA256');
        hash.update(blockStr).end();
        return hash.digest('hex');
    }

    initOtherData(otherData: { id: string, timestamp: number, nonce: number }) {
        this.id = otherData.id;
        this.timestamp = otherData.timestamp;
        this.nonce = otherData.nonce;
        return this;
    }
}