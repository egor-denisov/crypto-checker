import * as ChartActionCreators from './chart'
import * as CoinInfoActionCreators from './coinInfo'
import * as CoinRatesActionCreators from './coinRates'
import * as UserActionCreators from './user'
import * as WalletMenu from './walletMenu'
export default {
	...ChartActionCreators,
	...CoinInfoActionCreators,
	...CoinRatesActionCreators,
	...UserActionCreators,
	...WalletMenu
}
