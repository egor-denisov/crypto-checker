import { coins } from '../collection/coins'
import {
	CoinRatesType,
	Paginationtype,
	rateWithNameType
} from '../types/CoinRatesTypes'

export const getCountOfPages = (limit: number, size: number) => {
	if (size % limit === 0) return ~~(size / limit)
	return ~~(size / limit) + 1
}
export const getMatchOfSearching = (
	mass: rateWithNameType[],
	searchString: string
): rateWithNameType[] => {
	const ss = searchString.toLowerCase()
	if (ss === '') return mass
	return mass.filter(
		(data) =>
			data.name.toLowerCase().includes(ss) ||
			coins.get(data.name)?.symbol?.toString().toLowerCase().includes(ss)
	)
}
export const getMassivWithNameFromObject = (obj: CoinRatesType['rates']) => {
	return Object.keys(obj).map((name) => {
		const value = obj[name]
		return {
			name: name,
			...value
		}
	})
}
export const getCoinsInMassiv = (
	rates: CoinRatesType['rates'],
	massiv: string[]
): CoinRatesType['rates'] => {
	const obj: CoinRatesType['rates'] = {}
	Object.keys(rates).forEach((el: string) => {
		if (massiv.includes(el)) obj[el] = rates[el]
	})
	return obj
}
export const getCoinsOutMassiv = (
	rates: CoinRatesType['rates'],
	massiv: string[]
): CoinRatesType['rates'] => {
	const obj: CoinRatesType['rates'] = {}
	Object.keys(rates).forEach((el: string) => {
		if (!massiv.includes(el)) obj[el] = rates[el]
	})
	return obj
}
export const getPaginationPage = (
	data: rateWithNameType[],
	pagination: Paginationtype
) => {
	const res = data.splice(
		pagination.page * pagination.limit,
		pagination.limit
	)
	if (res.length < pagination.limit) {
		return res.concat(Array(pagination.limit - res.length).fill(undefined))
	}
	return res
}
export const getSortMassiv = (
	typeOfSorting: string,
	obj: CoinRatesType['rates'],
	searchString: string
): rateWithNameType[] => {
	const data = getMatchOfSearching(
		getMassivWithNameFromObject(obj),
		searchString
	)
	const getSortedMassiv = (data: rateWithNameType[]) => {
		switch (typeOfSorting) {
			case 'name-ascending':
				return data.sort((a, b) => (a.name > b.name ? 1 : -1))
			case 'name-descending':
				return data.sort((a, b) => (a.name > b.name ? -1 : 1))
			case 'capitalization-ascending':
				return data.sort((a, b) => (a.marketCap > b.marketCap ? -1 : 1))
			case 'capitalization-descending':
				return data.sort((a, b) => (a.marketCap > b.marketCap ? 1 : -1))
			case 'volume24h-ascending':
				return data.sort((a, b) =>
					a.totalVolume > b.totalVolume ? -1 : 1
				)
			case 'volume24h-descending':
				return data.sort((a, b) =>
					a.totalVolume > b.totalVolume ? 1 : -1
				)
			case 'price-ascending':
				return data.sort((a, b) => (~~a.rate > ~~b.rate ? -1 : 1))
			case 'price-descending':
				return data.sort((a, b) => (~~a.rate > ~~b.rate ? 1 : -1))
			case 'change-ascending':
				return data.sort((a, b) =>
					Number(a.priceChangePercent) > Number(b.priceChangePercent)
						? -1
						: 1
				)
			case 'change-descending':
				return data.sort((a, b) =>
					Number(a.priceChangePercent) > Number(b.priceChangePercent)
						? 1
						: -1
				)
			default:
				return data
		}
	}
	return getSortedMassiv(data)
}
