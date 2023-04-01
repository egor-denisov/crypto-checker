import { useEffect, useState } from 'react'
import {
	CoinRatesType,
	Paginationtype,
	rateWithNameType
} from '../types/CoinRatesTypes'
import { UserDataType } from '../types/userTypes'
import {
	getCountOfPages,
	getPaginationPage,
	getSortMassiv
} from '../utils/sortingAndSearchingCoins'

export const useTrackerCoinTable = (
	rates: CoinRatesType['rates'],
	pagination: Paginationtype,
	setPagination: Function,
	data: UserDataType,
	onePage = false
) => {
	const [typeOfSorting, setTypeOfSorting] = useState('capitalization')
	const [sortingDirection, setSortingDirection] = useState('ascending')
	const [searchString, setSearchString] = useState('')
	const [massivOfCoins, setMassivOfCoins] = useState<rateWithNameType[]>([])
	useEffect(() => {
		setMassivOfCoins(
			getPaginationPage(
				getSortMassiv(
					`${typeOfSorting}-${sortingDirection}`,
					rates,
					searchString
				),
				pagination
			)
		)
	}, [pagination.page])
	useEffect(() => {
		const res = getSortMassiv(
			`${typeOfSorting}-${sortingDirection}`,
			rates,
			searchString
		)
		if (!onePage)
			setPagination({
				...pagination,
				page: 0,
				countOfPages: getCountOfPages(pagination.limit, res.length)
			})
		setMassivOfCoins(getPaginationPage(res, pagination))
	}, [
		typeOfSorting,
		sortingDirection,
		searchString,
		data.washlist,
		rates,
		pagination.limit
	])
	return {
		typeOfSorting: typeOfSorting,
		setTypeOfSorting: setTypeOfSorting,
		sortingDirection: sortingDirection,
		setSortingDirection: setSortingDirection,
		searchString: searchString,
		setSearchString: setSearchString,
		massivOfCoins: massivOfCoins,
		setMassivOfCoins: setMassivOfCoins
	}
}
