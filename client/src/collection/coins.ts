export const coins : Map<string, {symbol: string, point: number, color: string}> = new Map()
.set("bitcoin", {
    symbol: "btc",
    point: 2,
    color: '#f7931a'
})
.set("ethereum", {
    symbol: "eth",
    point: 2,
    color: '#8ffcf3'
})
.set("binancecoin", {
    symbol: "bnb",
    point: 2,
    color: '#f3ba2f'
})
.set("cardano", {
    symbol: "ada",
    point: 4,
    color: '#246dd3'
})
.set("solana", {
    symbol: "sol",
    point: 2,
    color: '#9b54be'
})
.set("polkadot", {
    symbol: "dot",
    point: 2,
    color: '#e6007a'  
})
.set("tron", {
    symbol: "trx",
    point: 5,
    color: '#c4342b' 
})
.set("1inch", {
    symbol: "1inch",
    point: 4,
    color: '#1b314f' 
})
.set("trust-wallet-token", {
    symbol: "twt",
    point: 2,
    color: '#3274c0' 
})
.set("dogecoin", {
    symbol: "doge",
    point: 5,
    color: '#c3a634' 
})
.set("litecoin", {
    symbol: "ltc",
    point: 2,
    color: '#345d9d' 
})
.set("binance-peg-xrp", {
    symbol: "xrp",
    point: 4,
    color: '#0f1014' 
})
.set("uniswap", {
    symbol: "uni",
    point: 2,
    color: '#ff0a6f' 
})
.set("ethereum-classic", {
    symbol: "etc",
    point: 2,
    color: '#01c853' 
})
.set("pancakeswap-token", {
    symbol: "cake",
    point: 2,
    color: '#37cbd4' 
})
.set("shiba-inu", {
    symbol: "shib",
    point: 8,
    color: '#fc1e1f' 
})
.set("binance-peg-avalanche", {
    symbol: "avax",
    point: 2,
    color: '#e84142' 
})
.set("chainlink", {
    symbol: "link",
    point: 2,
    color: '#2e61de' 
})
.set("cosmos", {
    symbol: "atom",
    point: 2,
    color: '#2e3356' 
})
.set("monero", {
    symbol: "xmr",
    point: 2,
    color: '#ff6600' 
})
export const getSymbol = (coin : string) : string => {
    const data = coins.get(coin)
    if(data !== undefined){
        return data.symbol
    }
    return ''
}
export const getCoinPoints = (coin : string) : number => {
    const data = coins.get(coin)
    if(data !== undefined){
        return data.point
    }
    return 2
}
export const getColor = (coin : string) : string => {
    const data = coins.get(coin)
    if(data !== undefined){
        return data.color
    }
    return '#fff'
}