import EVaultChain from "./helpers/EVaultChain.js";
const Chain = new EVaultChain().initDb();
Chain.chainImpureCb = () => {
    console.log('RED RED RED');
};
setTimeout(() => {
    // console.log(Chain);
    // const block = new Block({
    //     heading: "Test",
    //     details: "Testing the program",
    //     fileName: "--N/A--",
    // }, Chain.chain[Chain.chain.length - 1].hash);
    // console.log(Chain.addBlock(block));
    // for (let i = 0; ; i++) {
    //     block.nonce = i;
    //     const hashValid = Chain.hashDesignIsValid(block.hash);
    //     if (hashValid) break;
    // }
    // console.log(Chain.addBlock(block));
    console.log(Chain, Chain.chainIsPure(), Chain.chain[0].hash);
}, 5000);
