import React, { useState } from 'react'
import { useTrackerCoinTable } from '../hooks/useTrackerCoinTable'
import {
	getCoinsOutMassiv,
	getCountOfPages
} from '../utils/sortingAndSearchingCoins'
import CoinsTable from './TableOfCoins/CoinsTable'
import Pagination from './Pagination'
import TitleOfTableOfCoins from './TableOfCoins/TitleOfTableOfCoins'
import MyInput from './UI/MyInput/MyInput'
import MyModal from './UI/MyModal/MyModal'
import SearchSVG from '../svg/Search'
import { coins } from '../collection/coins'
import { useTypedSelector } from '../hooks/useTypedSelector'

const AddingAlert = ({ setVisible }: { setVisible: Function }) => {
	const [pagination, setPagination] = useState({
		page: 0,
		limit: 5,
		countOfPages: getCountOfPages(5, coins.size)
	})
	const { rates, loading } = useTypedSelector((state) => state.coinRates)
	const { data } = useTypedSelector((state) => state.user)
	const {
		typeOfSorting,
		setTypeOfSorting,
		sortingDirection,
		setSortingDirection,
		searchString,
		setSearchString,
		massivOfCoins
	} = useTrackerCoinTable(
		getCoinsOutMassiv(rates, data.washlist),
		pagination,
		setPagination,
		data,
		loading
	)
	return (
		<MyModal setVisible={setVisible} className="modal-washlist">
			<div className="title">Add coin to washlist</div>
			<div>Select the coins you want to add</div>
			<div className="search">
				<MyInput
					placeholder="Find by name"
					value={searchString}
					onChange={(e: React.FormEvent<HTMLInputElement>) =>
						setSearchString(e.currentTarget.value)
					}
				>
					<SearchSVG />
				</MyInput>
			</div>
			<CoinsTable
				massivOfCoins={massivOfCoins}
				userData={data}
				showWalletButton={false}
			>
				<TitleOfTableOfCoins
					typeOfSorting={typeOfSorting}
					setTypeOfSorting={setTypeOfSorting}
					sortingDirection={sortingDirection}
					setSortingDirection={setSortingDirection}
				/>
			</CoinsTable>
			<Pagination pagination={pagination} setPagination={setPagination} />
		</MyModal>
	)
}

export default AddingAlert
