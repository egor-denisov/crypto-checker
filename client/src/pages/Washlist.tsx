import { useEffect, useState } from 'react'
import CoinsTable from '../components/TableOfCoins/CoinsTable'
import TitleOfTableOfCoins from '../components/TableOfCoins/TitleOfTableOfCoins'
import MyButton from '../components/UI/MyButton/MyButton'
import MyModal from '../components/UI/MyModal/MyModal'
import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { useTrackerCoinTable } from '../hooks/useTrackerCoinTable'
import WashlistAddingAlert from '../components/WashlistAddingAlert'
import { getCoinsInMassiv } from '../utils/sortingAndSearchingCoins'
import { useLoadingRates } from '../hooks/useLoadingRates'

const Washlist = () => {
	const [confirmAlert, setConfirmAlert] = useState(false)
	const [addModal, setAddModal] = useState(false)
	const { rates, loading } = useTypedSelector((state) => state.coinRates)
	const { data } = useTypedSelector((state) => state.user)
	const [pagination, setPagination] = useState({
		page: 0,
		limit: data.washlist.length,
		countOfPages: 1
	})
	const { clearWashlist } = useActions()
	useLoadingRates()
	useEffect(
		() => setPagination({ ...pagination, limit: data.washlist.length }),
		[data.washlist]
	)
	const {
		typeOfSorting,
		setTypeOfSorting,
		sortingDirection,
		setSortingDirection,
		massivOfCoins
	} = useTrackerCoinTable(
		getCoinsInMassiv(rates, data.washlist),
		pagination,
		setPagination,
		data,
		loading,
		true
	)
	return (
		<div className="washlist main">
			{addModal && <WashlistAddingAlert setVisible={setAddModal} />}
			{confirmAlert && (
				<MyModal
					setVisible={setConfirmAlert}
					className="modal-washlist"
				>
					<div className="title">Clear washlist</div>
					<div className="info">
						You realy want to delele all from your washlist?
					</div>
					<div className="choice">
						<MyButton onClick={() => setConfirmAlert(false)}>
							No
						</MyButton>
						<MyButton
							onClick={() => {
								clearWashlist(data.washlist_id)
								setConfirmAlert(false)
							}}
						>
							Yes
						</MyButton>
					</div>
				</MyModal>
			)}
			<div className="washlist-navbar">
				<MyButton onClick={() => setConfirmAlert(true)}>
					Delete all
				</MyButton>
				<MyButton onClick={() => setAddModal(true)}>Add coins</MyButton>
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

			{data.washlist.length === 0 ? (
				<p className="empty">Washlist empty</p>
			) : (
				<></>
			)}
		</div>
	)
}

export default Washlist
