import { ASocket } from "plugboard.io";
import { BlockType } from "../../types.js";
import { writeFile, readdir } from "fs/promises";
import Block from "../helpers/Block.js";
import { EVault } from "../index.js";
import { v4 } from "uuid";
import Pending from "../Schema/Pending.js";

const NO_FILE = 'N/A'
const FILE_LOC = '../assets/docs'

export default class extends ASocket<[BlockType, Buffer|undefined]> {
    async run() {
        if (!this.args) return;

        const otherFiles = await readdir(FILE_LOC);
        const [data, file] = this.args;

        const block = new Block(data, EVault.chain[EVault.chain.length - 1].hash);

        // if file of the same name already exists, prefix it with id of the block
        if (otherFiles.includes(data.fileName))
            data.fileName = block.id + ":" + data.fileName;

        if (file) {
            // if file name is N/A, rename it to id of thet block
            if (data.fileName == NO_FILE)
                data.fileName = block.id;

            try {
                await writeFile(`${FILE_LOC}/${data.fileName}`, file);
            } catch {
                console.log('error-uploading');
                this.socket?.emit('error-uploading');
                return;
            }
        }

        await Pending.insertMany([{
            id: block.id,
            timestamp: block.timestamp,
            prevBlockHash: block.prevBlockHash,
            nonce: block.nonce,
            data: block.data,
        }]);

        this.io?.emit('data-uploaded');
    }
}