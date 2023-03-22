export type Address = {
    hash160: string,
    address: string,
    n_tx: number,
    n_unredeemed: number,
    total_received: number,
    total_sent: number,
    final_balance: number
}

export type Tx = {
    hash: string,
    time: number,
    status?: "complete" | "pending",
    size: number,
    confirmations?: number,
    fee: number,
    block_index: number| null,
    block_height: number | null,
    inputs: TxInput[],
    out: TxOut[],
    total_input: number,
    total_output: number
}

export type TxInput = {
    prev_out: TxOut
}

export type TxOut = {
    hash: string,
    value: number
}

export type LatestBlock = {
    block_index: number,
    hash: string,
    height: number,
    time: number
}

export type Ticker = {
    symbol: string,
    price_24h: number,
    volume_24h: number,
    last_trade_price: number
}