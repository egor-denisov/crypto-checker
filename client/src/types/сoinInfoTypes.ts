export type ChangeType = {change: number, change_percentage: number}
export type MarketInfoType = {
    marketCap: number,
    fdmarketCap: number,
    totalVolume: number,
    circulatatingSupply: number,
    maxSupply: number,
    change: {price_change_24h: number, price_change_percentage_24h: number},
    rate: number,
    openPrice: number
}

export type CoinInfoType = {
    name: string,
    symbol: string,
    MarketInfo: MarketInfoType,
    error: null | string,
    loading: boolean
}
export enum CoinInfoActionTypes {
    FETCH_COININFO = "FETCH_COININFO",
    FETCH_COININFO_SUCCESS = "FETCH_COININFO_SUCCESS",
    FETCH_COININFO_ERROR = "FETCH_COININFO_ERROR",
    SET_NAME_COIN = "SET_NAME_COIN",
    SET_RATE_COIN = "SET_RATE_COIN"
}
interface FetchCoinInfoAction {
    type: CoinInfoActionTypes.FETCH_COININFO,
}
interface FetchCoinInfoSuccessAction {
    type: CoinInfoActionTypes.FETCH_COININFO_SUCCESS,
    payload: MarketInfoType
}
interface FetchCoinInfoErrorAction {
    type: CoinInfoActionTypes.FETCH_COININFO_ERROR,
    payload: string
}
interface SetNameCoinAction {
    type: CoinInfoActionTypes.SET_NAME_COIN,
    payload: string
}
interface SetRateCoinAction {
    type: CoinInfoActionTypes.SET_RATE_COIN,
    payload: number
}


export type CoinInfoAction =  FetchCoinInfoAction | FetchCoinInfoSuccessAction | FetchCoinInfoErrorAction | SetNameCoinAction | SetRateCoinAction