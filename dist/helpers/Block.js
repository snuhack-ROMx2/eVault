import { createHash } from "crypto";
import { v4 } from 'uuid';
export default class Block {
    constructor(data) {
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
