import axios from "axios"
import { Dispatch } from "redux"
import { CoinRatesAction, CoinRatesActionTypes, rateType } from "../../types/CoinRatesTypes"
import { coins, getSymbol } from "../../collection/coins"
export const fetchCoinRates = () => {
    return async (dispatch: Dispatch<CoinRatesAction>) => {
         try{
            dispatch({type: CoinRatesActionTypes.FETCH_COIN_RATES})
            const responseInfo = await axios.get(`https://api.coingecko.com/api/v3/coins/markets`, {
                params: {vs_currency: 'usd', 
                         ids: Array.from(coins.keys()).join(`, `), 
                         order: 'market_cap_desc', 
                         per_page: 100, 
                         page: 1, 
                         sparkline: false}
            })
            const capAndVolume: {[name: string]: {market_cap: number, total_volume: number}} = {}
            responseInfo.data.forEach( (el:any) => {
                capAndVolume[el.id] = {market_cap: el.market_cap, total_volume: el.total_volume}
            });
            Array.from(coins.keys()).forEach( async name => {
                const response = await axios.get(`https://api.binance.com/api/v3/ticker`, {
                    params: {symbol: getSymbol(name).toUpperCase() + "USDT"}
                })
                const data = {
                    rate: response.data.lastPrice,
                    priceChange: response.data.priceChange,
                    priceChangePercent: response.data.priceChangePercent,
                    marketCap: capAndVolume[name].market_cap,
                    totalVolume: capAndVolume[name].total_volume
                }
                const res: { [name: string] : rateType} = {}
                res[name] = data
                dispatch({type: CoinRatesActionTypes.FETCH_COIN_RATE_SUCCESS, payload: res})
            })
            
         }catch(e){
            dispatch({type: CoinRatesActionTypes.FETCH_COIN_RATES_ERROR, 
                      payload: 'Error'
            })
         }
    }
}




// import axios from "axios"
// import { Dispatch } from "redux"
// import { CoinRatesAction, CoinRatesActionTypes, rateType } from "../../types/CoinRatesTypes"
// import { coins, getSymbol } from "../../collection/coins"
// export const fetchCoinRates = () => {
//     return async (dispatch: Dispatch<CoinRatesAction>) => {
//          try{
//             dispatch({type: CoinRatesActionTypes.FETCH_COIN_RATES})
//             Array.from(coins.keys()).forEach( async name => {
//                 const response = await axios.get(`https://api.binance.com/api/v3/ticker`, {
//                     params: {symbol: getSymbol(name).toUpperCase() + "USDT"}
//                 })
//                 const responseInfo = await axios.get(`https://api.coingecko.com/api/v3/coins/markets`, {
//                 params: {vs_currency: 'usd', 
//                          ids: name, 
//                          order: 'market_cap_desc', 
//                          per_page: 100, 
//                          page: 1, 
//                          sparkline: false}
//                 })
//                 const data = {
//                     rate: response.data.lastPrice,
//                     priceChange: response.data.priceChange,
//                     priceChangePercent: response.data.priceChangePercent,
//                     marketCap: responseInfo.data[0].market_cap,
//                     totalVolume: responseInfo.data[0].total_volume
//                 }
//                 const res: { [name: string] : rateType} = {}
//                 res[name] = data
//                 dispatch({type: CoinRatesActionTypes.FETCH_COIN_RATE_SUCCESS, payload: res})
//             })
//             dispatch({type: CoinRatesActionTypes.FETCH_COIN_RATES_SUCCESS, payload: null})
//          }catch(e){
//             dispatch({type: CoinRatesActionTypes.FETCH_COIN_RATES_ERROR, 
//                       payload: 'Error'
//             })
//          }
//     }
// }