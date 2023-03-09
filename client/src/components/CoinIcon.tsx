import React, { FC } from 'react'
import { getSymbol } from '../collection/coins'
type props = {
	coin: string
	size: string
}
const CoinIcon: FC<props> = ({ coin, size }) => {
	if (coin === '') return <div className="coin-logo"></div>
	const styles = {
		minWidth: '20px',
		minHeight: '20px',
		width: size,
		height: size,
		borderRadius: '35%',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		backgroundImage: `url('https://s3-symbol-logo.tradingview.com/crypto/XTVC${getSymbol(
			coin
		).toUpperCase()}--big.svg')`
	}
	return <div style={styles} className="coin-logo"></div>
}

export default CoinIcon
