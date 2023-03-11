import React, { useEffect, useState } from 'react'
import { useTypedSelector } from '../hooks/useTypedSelector'
import LeftWalletMenu from '../components/Wallet/LeftWalletMenu'
import { zerosAfterPoint } from '../utils/helper'
import { useLoadingRates } from '../hooks/useLoadingRates'
import TotalPage from '../components/Wallet/TotalPage'
import CoinPage from '../components/Wallet/CoinPage'
import WalletAddingAlert from '../components/WalletAddingAlert'
import { useActions } from '../hooks/useActions'

const Wallet = () => {
	const [activePart, setActivePart] = useState('total')
	const [walletPercentage, setWalletPercentage] = useState([100])
	const [modal, setModal] = useState({ vizible: false, activeInput: true })
	const [modalCoin, setModalCoin] = useState('')
	const [editMode, setEditMode] = useState(false)

	const { ChangeWallet, setNameCoin } = useActions()
	const { data } = useTypedSelector((state) => state.user)
	const { rates } = useTypedSelector((state) => state.coinRates)
	const [currentBalance, setCurrentBalance] = useState(
		data.wallet_keys.reduce(
			(sum, coin) => sum + data.wallet[coin].count * rates[coin].rate,
			0
		)
	)

	const AddOrClose = () => {
		setModalCoin('')
		if (editMode) setEditMode(false)
		else setModal({ vizible: true, activeInput: true })
	}
	const deleteFromWallet = (coin: string, e?: React.MouseEvent) => {
		e?.stopPropagation()
		ChangeWallet(
			coin,
			{ count: 0, price: 0 },
			data.wallet,
			data.wallet_id,
			'delete'
		)
		setActivePart('total')
	}
	const editCoinInWallet = (coin: string, e?: React.MouseEvent) => {
		e?.stopPropagation()
		setModal({ vizible: true, activeInput: false })
		setModalCoin(coin)
		setActivePart(coin)
	}
	const goEditMode = () => {
		setEditMode(true)
	}

	useEffect(() => {
		const summ = data.wallet_keys.reduce(
			(sum, el) => sum + data.wallet[el].price * data.wallet[el].count,
			0
		)
		const precentege = data.wallet_keys.map((el) =>
			Number(
				zerosAfterPoint(
					(data.wallet[el].price * data.wallet[el].count * 100) /
						summ,
					2
				)
			)
		)
		setWalletPercentage(precentege)
	}, [data.wallet])
	useEffect(() => {
		setCurrentBalance(
			data.wallet_keys.reduce(
				(sum, coin) => sum + data.wallet[coin].count * rates[coin].rate,
				0
			)
		)
	}, [data.wallet, rates])
	useEffect(() => {
		setNameCoin('')
		setActivePart('total')
	}, [data.id])
	useLoadingRates()
	return (
		<div className="wallet">
			{modal.vizible && (
				<WalletAddingAlert
					coin={modalCoin}
					setVisible={(vizible: boolean) =>
						setModal({ ...modal, vizible: vizible })
					}
					setActivePart={setActivePart}
					IsWithInput={modal.activeInput}
				/>
			)}
			<LeftWalletMenu
				activePart={activePart}
				setActivePart={setActivePart}
				currentBalance={currentBalance}
				editMode={editMode}
				AddOrClose={AddOrClose}
				deleteFromWallet={deleteFromWallet}
				editCoinInWallet={editCoinInWallet}
				goEditMode={goEditMode}
			/>
			<div className="wallet-content">
				{activePart === 'total' ? (
					<TotalPage
						walletPercentage={walletPercentage}
						currentBalance={currentBalance}
					/>
				) : (
					<CoinPage
						coin={activePart}
						wallet={data.wallet[activePart]}
						price={rates[activePart].rate}
						deleteFromWallet={deleteFromWallet}
						editCoinInWallet={editCoinInWallet}
					/>
				)}
			</div>
		</div>
	)
}

export default Wallet
