import { getSymbol } from "../../collection/coins"
import { CoinInfoType, CoinInfoAction, CoinInfoActionTypes } from "../../types/сoinInfoTypes"

const initialCoinInfo: CoinInfoType = {
    name: '',
    symbol: '',
    MarketInfo:{
        marketCap: 0,
        fdmarketCap: 0,
        totalVolume: 0,
        circulatatingSupply: 0,
        maxSupply: 0,
        change: {price_change_24h: 0, price_change_percentage_24h: 0},
        rate: 0,
        openPrice: 0
    }, 
    loading: false,
    error: null,
}
export const CoinInfoReducer = (state = initialCoinInfo, action: CoinInfoAction) => {
    switch (action.type){
        case CoinInfoActionTypes.FETCH_COININFO:
            return {...state, loading: true}
        case CoinInfoActionTypes.FETCH_COININFO_SUCCESS:
            return {...state, loading: false, MarketInfo: action.payload}
        case CoinInfoActionTypes.FETCH_COININFO_ERROR:
            return {...state, loading: false, error: action.payload}
        case CoinInfoActionTypes.SET_NAME_COIN:
            return {...state, name: action.payload, symbol: getSymbol(action.payload)}
        case CoinInfoActionTypes.SET_RATE_COIN:
            return {...state, MarketInfo: {...state.MarketInfo, rate: action.payload, change: {price_change_24h: action.payload - state.MarketInfo.openPrice, 
                                                                                               price_change_percentage_24h: (action.payload - state.MarketInfo.openPrice)/state.MarketInfo.openPrice*100}}}
        default:
            return state
    }
}