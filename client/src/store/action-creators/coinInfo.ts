import axios from 'axios'
import { Dispatch } from 'redux'
import { getSymbol } from '../../collection/coins'
import { CoinInfoAction, CoinInfoActionTypes } from '../../types/сoinInfoTypes'
export const fetchCoinInfo = (name = '') => {
	if (name === '') return async (dispatch: Dispatch<CoinInfoAction>) => {}
	return async (dispatch: Dispatch<CoinInfoAction>) => {
		try {
			console.log('FETCHCOININFO', name)
			dispatch({ type: CoinInfoActionTypes.FETCH_COININFO })
			const responseInfo = await axios.get(
				`https://api.coingecko.com/api/v3/coins/markets`,
				{
					params: {
						vs_currency: 'usd',
						ids: name,
						order: 'market_cap_desc',
						per_page: 100,
						page: 1,
						sparkline: false
					}
				}
			)
			const data = responseInfo.data[0]
			const info = {
				marketCap: data.market_cap,
				fdmarketCap: data.fully_diluted_valuation,
				totalVolume: data.total_volume,
				circulatatingSupply: data.circulating_supply,
				maxSupply: data.total_supply
			}
			const responseRate = await axios.get(
				`https://api.binance.com/api/v3/ticker`,
				{
					params: { symbol: getSymbol(name).toUpperCase() + 'USDT' }
				}
			)
			const rate = {
				rate: responseRate.data.lastPrice,
				change: {
					price_change_24h: responseRate.data.priceChange,
					price_change_percentage_24h:
						responseRate.data.priceChangePercent
				},
				openPrice: responseRate.data.openPrice
			}

			dispatch({
				type: CoinInfoActionTypes.FETCH_COININFO_SUCCESS,
				payload: { ...info, ...rate }
			})
		} catch (e) {
			dispatch({
				type: CoinInfoActionTypes.FETCH_COININFO_ERROR,
				payload: 'Error'
			})
		}
	}
}
export const setNameCoin = (name: string): CoinInfoAction => {
	console.log('new name', name)
	return { type: CoinInfoActionTypes.SET_NAME_COIN, payload: name }
}
export const setRateCoin = (rate: number): CoinInfoAction => {
	return { type: CoinInfoActionTypes.SET_RATE_COIN, payload: rate }
}
