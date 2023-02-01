import { ChartType, ChartAction, ChartActionTypes } from "../../types/chartTypes"
const initialChart: ChartType = {
    labels: [],
    prices: [],
    period: 30,
    loading: false,
    error: null,
}
export const ChartReducer = (state = initialChart, action: ChartAction) => {
    switch (action.type){
        case ChartActionTypes.FETCH_CHART:
            return {...state, loading: true, prices: [], labels: []}
        case ChartActionTypes.FETCH_CHART_SUCCESS:
            return {...state, error: null, loading: false, prices: action.payload.prices, labels: action.payload.labels}
        case ChartActionTypes.FETCH_CHART_ERROR:
            return {...state, loading: false, error: action.payload}
        case ChartActionTypes.SET_CHART_PERIOD:
            return {...state, period: action.payload}
        default:
            return state
    }
}