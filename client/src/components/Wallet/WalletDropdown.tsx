import React, { FC, useState } from 'react'
import { useActions } from '../../hooks/useActions'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import DotsHorizontalSVG from '../../svg/DotsHorizontal'
import { uniteClasses } from '../../utils/helper'
type props = {
	coin: string
	deleteFromWallet: Function
	editCoinInWallet: Function
}
const WalletDropdown: FC<props> = ({
	coin,
	deleteFromWallet,
	editCoinInWallet
}) => {
	const { vizibleDropdownMenu } = useTypedSelector(
		(state) => state.walletMenu
	)
	const { showDropdownWalletMenu } = useActions()
	const vizible = (e: React.MouseEvent) => {
		e.stopPropagation()
		showDropdownWalletMenu()
	}
	return (
		<div className="wallet-dropdown">
			{vizibleDropdownMenu && (
				<div
					className={uniteClasses([
						'dropdown',
						vizibleDropdownMenu && 'active'
					])}
				>
					<div className="item">
						<a href={'coins/' + coin}>More about</a>
					</div>
					<div
						className="item"
						onClick={() => editCoinInWallet(coin)}
					>
						Edit
					</div>
					<div
						className="item"
						onClick={() => deleteFromWallet(coin)}
					>
						Delete
					</div>
				</div>
			)}
			<DotsHorizontalSVG
				onClick={(e: React.MouseEvent) => vizible(e)}
				className="dots"
			/>
		</div>
	)
}

export default WalletDropdown
