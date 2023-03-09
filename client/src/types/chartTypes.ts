import { dateType } from './dateType'
export type timeAndPriceType = [number, number]
export type ChartType = {
	prices: number[]
	labels: dateType[]
	period: number
	error: null | string
	loading: boolean
}
export enum ChartActionTypes {
	FETCH_CHART = 'FETCH_CHART',
	FETCH_CHART_SUCCESS = 'FETCH_CHART_SUCCESS',
	FETCH_CHART_ERROR = 'FETCH_CHART_ERROR',
	SET_CHART_PERIOD = 'SET_CHART_PERIOD'
}
interface FetchChartAction {
	type: ChartActionTypes.FETCH_CHART
}
interface FetchChartSuccessAction {
	type: ChartActionTypes.FETCH_CHART_SUCCESS
	payload: { labels: dateType[]; prices: number[] }
}
interface FetchChartErrorAction {
	type: ChartActionTypes.FETCH_CHART_ERROR
	payload: string
}
interface SetChartPeriodAction {
	type: ChartActionTypes.SET_CHART_PERIOD
	payload: number
}

export type ChartAction =
	| FetchChartAction
	| FetchChartSuccessAction
	| FetchChartErrorAction
	| SetChartPeriodAction
