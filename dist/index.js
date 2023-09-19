import EVaultChain from "./helpers/EVaultChain.js";
import { Plugboard } from "plugboard.io";
export const Chain = new EVaultChain().initDb();
const plugboard = new Plugboard('dist/sockets', {
    cors: { origin: "*" },
    maxHttpBufferSize: 1e7,
});
plugboard.start(3000, () => console.log('[server started]'));
