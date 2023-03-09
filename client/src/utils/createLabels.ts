import { dateType } from '../types/dateType'
export const createLabelsWithTime = (
	dateAndTimeMassiv: dateType[]
): string[] => {
	return [
		...dateAndTimeMassiv.map((dateAndTime) => {
			return (
				dateAndTime.day.toString() +
				' ' +
				dateAndTime.month +
				' `' +
				(dateAndTime.year % 100).toString() +
				' ' +
				`0${dateAndTime.hours.toString()}`.slice(-2) +
				':' +
				`0${dateAndTime.minutes.toString()}`.slice(-2)
			)
		}),
		...Array(20).fill(NaN),
		'Last price'
	]
}
export const createLabelsWithOutTime = (dateMassiv: dateType[]): string[] => {
	return [
		...dateMassiv.map((date) => {
			return (
				date.day.toString() +
				' ' +
				date.month +
				' `' +
				(date.year % 100).toString()
			)
		}),
		...Array(20).fill(NaN),
		'Last price'
	]
}
export const getLineValues = (rate: number, prices: number[]) => {
	const pointsCount = prices.length
	if (pointsCount) {
		return [rate, ...Array(pointsCount - 2 + 21).fill(NaN), rate]
	}
	return []
}
export const getChartValues = (rate: number, prices: number[]) => {
	const pointsCount = prices.length
	if (pointsCount) {
		return [
			...prices.slice(0, pointsCount - 1),
			rate,
			...Array(20).fill(NaN)
		]
	}
	return []
}
export const zerozAfterPoint = (number: number, count: number): number => {
	return Number(
		(Math.floor(number * 10 ** count) / 10 ** count).toFixed(count)
	)
}
