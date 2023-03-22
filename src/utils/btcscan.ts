import { Address, LatestBlock, Ticker, Tx, TxInput, TxOut } from "./types";

export const GetAddressInfo = async (address: string):Promise<Address | null> => {
    const url:string = `https://blockchain.info/rawaddr/${address}`;

    try{
        const res = await fetch(url);
        const data:Address | null = await res.json();
        return data && data.address ? data : null;
    } catch (e) {
        return null;
    }
}

export const GetTxInfo = async (hash: string):Promise<Tx | null> => {
    const url:string = `https://blockchain.info/rawtx/${hash}`;

    try{
        const res = await fetch(url);
        const data:Tx | null = await res.json();

        if(data && data.hash){
            data.status = data.block_index !== null ? "complete" : "pending";
            data.total_input = 0;
            data.total_output = 0;
            data.inputs.map((input:TxInput) => {
                data.total_input += input.prev_out.value;
            });
            data.out.map((out:TxOut) => {
                data.total_output += out.value;
            });

            try{
                const lastBlock:number = await GetLatestBlock();
                data.confirmations = data.block_height ? lastBlock - data.block_height + 1 : 0;
            } catch (e) {
            }
            return data;
        } else {
            return null;
        }
    } catch (e) {
        return null;
    }
}

export const GetLatestBlock = async ():Promise<number> => {
    const url:string = `https://blockchain.info/latestblock?cors=true`;

    const res = await fetch(url);
    const data:LatestBlock = await res.json();

    return data.height;
}

export const GetTicker = async (curr:string):Promise<number> => {
    const url:string = `https://api.blockchain.com/v3/exchange/tickers/BTC-${curr}`;

    const res = await fetch(url);
    const data:Ticker = await res.json();

    return data.last_trade_price;
}