import { combineReducers } from "redux";
import { ChartReducer } from "./chartReducer";
import { CoinInfoReducer } from "./coinInfoReducer";
import { CoinRatesReducer } from "./coinRatesReducer";
import { UserReducer } from "./userReducer";
import { WalletMenuReducer } from './walletMenuReducer'
export const rootReducer = combineReducers({
    chart: ChartReducer,
    coinInfo: CoinInfoReducer,
    coinRates: CoinRatesReducer,
    user: UserReducer,
    walletMenu: WalletMenuReducer
})

export type RootState = ReturnType<typeof rootReducer>