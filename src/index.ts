import Block from "./helpers/Block.js";
import EVaultChain from "./helpers/EVaultChain.js";


const Chain = new EVaultChain();

const block = new Block({
    heading: "Test",
    details: "Testing the program",
    fileName: "--N/A--",
    prevBlockHash: Chain.chain[Chain.chain.length - 1].hash,
    nonce: 0
});

for (let i = 0;;i++) {
    block.data.nonce = i;
    const hashValid = Chain.hashDesignIsValid(block.hash);
    if (hashValid) break;
}

console.log(block.hash, block.data.nonce);