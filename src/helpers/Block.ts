import { createHash } from "crypto";
import { BlockType } from "../../types";
import { v4 } from 'uuid';

export default class Block {
    id: string
    data: BlockType;
    timestamp: number;

    constructor(data: BlockType) {
        this.id = v4();
        this.data = data;
        this.timestamp = Date.now();
    }

    get hash() {
        const blockStr = JSON.stringify(this.data);
        const hash = createHash('SHA256');
        hash.update(blockStr).end();
        return hash.digest('hex');
    }
}