export type rateType = {
    rate: number,
    priceChange: number,
    priceChangePercent: number,
    marketCap: number,
    totalVolume: number
}
export type rateWithNameType = (rateType & {name: string})
export type Paginationtype = {page: number, limit: number, countOfPages: number}
export type CoinRatesType = {
    rates: { [name: string] : rateType},
    error: null | string,
    loading: boolean
}
export enum CoinRatesActionTypes {
    FETCH_COIN_RATES = "FETCH_COIN_RATES",
    FETCH_COIN_RATE_SUCCESS = "FETCH_COIN_RATE_SUCCESS",
    FETCH_COIN_RATES_ERROR = "FETCH_COIN_RATES_ERROR"
}
interface FetchCoinRatesAction {
    type: CoinRatesActionTypes.FETCH_COIN_RATES,
}
interface FetchCoinRateSuccessAction {
    type: CoinRatesActionTypes.FETCH_COIN_RATE_SUCCESS,
    payload: CoinRatesType["rates"]
}
interface FetchCoinRatesErrorAction {
    type: CoinRatesActionTypes.FETCH_COIN_RATES_ERROR,
    payload: string
}
export type CoinRatesAction =  FetchCoinRatesAction | FetchCoinRatesErrorAction | FetchCoinRateSuccessAction