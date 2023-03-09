export type periodTypes = '1D' | '5D' | '1M' | '3M' | '6M' | '1Y' | '5Y'
export type dateType = {
	year: number
	month: monthsType
	day: number
	hours: number
	minutes: number
}
export type monthsType =
	| 'Jan'
	| 'Feb'
	| 'Mar'
	| 'Apr'
	| 'May'
	| 'Jun'
	| 'Jul'
	| 'Aug'
	| 'Sep'
	| 'Oct'
	| 'Nov'
	| 'Dec'
