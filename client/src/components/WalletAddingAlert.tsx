import React, { FC, useEffect, useState } from 'react'
import { getCoinPoints } from '../collection/coins'
import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { zerosAfterPoint } from '../utils/helper'
import InputWithMatches from './InputWithMatches'
import MyButton from './UI/MyButton/MyButton'
import MyInput from './UI/MyInput/MyInput'
import MyModal from './UI/MyModal/MyModal'
import { walletErrors } from '../collection/errors'
import { isExist } from '../utils/helper'
import MyNumber from './UI/MyNumber/MyNumber'
type props = {
	coin: string
	setVisible: Function
	IsWithInput: boolean
	setActivePart?: Function
}
const WalletAddingAlert: FC<props> = ({
	coin,
	setVisible,
	IsWithInput,
	setActivePart = () => {}
}) => {
	const { rates } = useTypedSelector((state) => state.coinRates)
	const { data } = useTypedSelector((state) => state.user)
	const [inWallet, setInWallet] = useState(data.wallet_keys.includes(coin))
	const [coinWalletData, setCoinWalletData] = useState(
		inWallet
			? {
					coin: coin,
					count: data.wallet[coin].count,
					price: data.wallet[coin].price
			  }
			: {
					coin: coin,
					count: 1,
					price:
						coin === ''
							? 0
							: Number(
									zerosAfterPoint(
										rates[coin]?.rate,
										getCoinPoints(coin)
									)
							  )
			  }
	)
	const [addingError, setAddingError] = useState('')
	const { ChangeWallet } = useActions()
	const changeCountOrPrice = (
		value: string,
		field: keyof typeof coinWalletData
	) => {
		setCoinWalletData({
			...coinWalletData,
			[field]: Number(value)
		})
	}
	const setValue = (value: string) => {
		setAddingError('')
		setCoinWalletData({
			...coinWalletData,
			coin: value,
			price: !isExist(rates[value]) ? 0 : rates[value].rate
		})
	}
	const addCoinToWallet = () => {
		const { coin, count, price } = coinWalletData
		if (!isExist(rates[coin])) setAddingError(walletErrors.nameError)
		else if (!count) setAddingError(walletErrors.countError)
		else if (!price) setAddingError(walletErrors.priceError)
		else {
			ChangeWallet(
				coinWalletData.coin,
				coinWalletData,
				data.wallet,
				data.wallet_id,
				'add'
			)
			setVisible(false)
			setActivePart(coin)
		}
	}
	const onEnter = (e: React.KeyboardEvent) => {
		if (e.keyCode === 13) addCoinToWallet()
	}
	useEffect(() => {
		const inWallet = data.wallet_keys.includes(coinWalletData.coin)
		setCoinWalletData(
			inWallet
				? {
						...coinWalletData,
						count: data.wallet[coin].count,
						price: data.wallet[coin].price
				  }
				: {
						...coinWalletData,
						count: 1,
						price:
							coinWalletData.coin === ''
								? 0
								: rates[coinWalletData.coin]?.rate
				  }
		)
		setInWallet(inWallet)
	}, [
		data.wallet_keys.includes(coinWalletData.coin),
		coinWalletData.coin,
		coin
	])
	return (
		<MyModal setVisible={setVisible} className="modal-wallet">
			<div className="title">Add coin to your wallet</div>
			<div>Select add settings</div>
			<div className="form">
				<div className="name">
					<p>Coin:</p>
					{IsWithInput ? (
						<InputWithMatches
							value={coinWalletData.coin}
							setValue={setValue}
							condition={
								addingError === walletErrors.nameError
									? 'error'
									: ''
							}
						/>
					) : (
						<MyInput
							value={coin}
							disabled
							condition={
								addingError === walletErrors.nameError
									? 'error'
									: ''
							}
						/>
					)}
					<div className="error">
						{addingError === walletErrors.nameError
							? addingError
							: ''}
					</div>
				</div>
				<div className="count">
					<p>Count:</p>
					<MyNumber
						value={coinWalletData.count}
						changeNumber={(value: string) =>
							changeCountOrPrice(value, 'count')
						}
					/>
					<div className="error">
						{addingError === walletErrors.countError
							? addingError
							: ''}
					</div>
				</div>
				<div className="price">
					<p>Price:</p>
					<MyNumber
						value={Number(coinWalletData.price)}
						changeNumber={(value: string) =>
							changeCountOrPrice(value, 'price')
						}
					/>
					<div className="error">
						{addingError === walletErrors.priceError
							? addingError
							: ''}
					</div>
				</div>
			</div>

			<div className="button">
				<MyButton onClick={addCoinToWallet}>
					{inWallet ? 'Save changes' : 'Add Coin'}
				</MyButton>
			</div>
		</MyModal>
	)
}

export default WalletAddingAlert
