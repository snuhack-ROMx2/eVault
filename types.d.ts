
/**Record data */
export type BlockType = {
    heading: string,
    details: string,
    fileName: string,
    prevBlockHash: string,
    nonce: number,
}

export type ChainErrors = 
    "[error: chain impure (breach suspected)]" | 
    "[rejected: invalid previous block]" | 
    "[rejected: invalid hash]"