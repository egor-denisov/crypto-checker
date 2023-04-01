import { coins } from '../../collection/coins'
import {
	CoinRatesType,
	CoinRatesAction,
	CoinRatesActionTypes
} from '../../types/CoinRatesTypes'

const initialCoinRates: CoinRatesType = {
	rates: {},
	loading: false,
	error: null
}
export const CoinRatesReducer = (
	state = initialCoinRates,
	action: CoinRatesAction
) => {
	switch (action.type) {
		case CoinRatesActionTypes.FETCH_COIN_RATES:
			return { ...state, loading: true }
		case CoinRatesActionTypes.FETCH_COIN_RATE_SUCCESS:
			return {
				...state,
				loading: false,
				rates: { ...state.rates, ...action.payload }
			}
		case CoinRatesActionTypes.FETCH_COIN_RATES_ERROR:
			return { ...state, loading: false, error: action.payload }
		default:
			return state
	}
}
