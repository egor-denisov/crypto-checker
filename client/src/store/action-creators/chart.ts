import axios from "axios"
import { Dispatch } from "redux"
import { getCoinPoints } from "../../collection/coins"
import { ChartAction, ChartActionTypes } from "../../types/chartTypes"
import { dateType } from "../../types/dateType"
import { unix2date } from "../../utils/unix2date"
export const fetchChart = (period = 30, name = '') => {
    if(name === '') return async (dispatch: Dispatch<ChartAction>) => {}
    return async (dispatch: Dispatch<ChartAction>) => {
         try{
            dispatch({type: ChartActionTypes.FETCH_CHART})
            const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${name}/market_chart`, {
                params: {vs_currency: 'usd', days: period}
            })
            const labels: dateType[] = []
            const prices: number[] = []
            response.data["prices"].forEach((mark: [number, number]) => {
                labels.push(unix2date(mark[0]))
                prices.push(Number(mark[1].toFixed(getCoinPoints(name))))
            })
            dispatch({type: ChartActionTypes.FETCH_CHART_SUCCESS, payload: {labels: labels, prices: prices}})
         }catch(e){
            dispatch({type: ChartActionTypes.FETCH_CHART_ERROR, 
                      payload: 'Error'
            })
         }
    }
}
export const setChartPeriod = (period: number): ChartAction => {
    return {type: ChartActionTypes.SET_CHART_PERIOD, payload: period}
}