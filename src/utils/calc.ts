export const calcExchange = (value:number, exch:number, decimals:number = 8) => {
    return exch * value / 10**8;
}