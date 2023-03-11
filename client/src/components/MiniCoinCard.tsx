import { FC } from 'react'
import { Link } from 'react-router-dom'
import { getCoinPoints, getSymbol } from '../collection/coins'
import { MarketInfoType } from '../types/сoinInfoTypes'
import { getBigNumber } from '../utils/helper'
import CoinIcon from './CoinIcon'
import Rate from './Rate'
type props = {
	coin: string
	change: MarketInfoType['change']
	rate: number
	marketCap: number
	totalVolume: number
}

const MiniCoinCard: FC<props> = ({
	coin,
	change,
	rate,
	marketCap,
	totalVolume
}) => {
	return (
		<Link
			to={'coins/' + coin}
			className="mini-coin-card"
			style={{ textDecoration: 'none', color: '#3b413cff' }}
		>
			<div className="mini-coin-card-header">
				<CoinIcon coin={coin} size="60px" />
				<div className="name">
					{coin}
					<div className="symbol">{getSymbol(coin)}</div>
				</div>
			</div>

			<Rate
				name={coin}
				change={change}
				rate={rate}
				currency="USD"
				numberAfterPoint={getCoinPoints(coin)}
				checkChanges={false}
			/>
			<div className="categories-block">
				<span>Categories</span>
				<div className="categories">
					<div className="category">First cat</div>
					<div className="category">Second cat</div>
					<div className="category">Third cat</div>
				</div>
			</div>
			<div className="add-info">
				<p>Market Cap: ${getBigNumber(marketCap)}</p>
				<p>Volume 24h: ${getBigNumber(totalVolume)}</p>
			</div>
		</Link>
	)
}

export default MiniCoinCard
