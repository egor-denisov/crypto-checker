import { useEffect } from 'react'
import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { getCoinPoints, getSymbol } from '../collection/coins'
import CoinIcon from '../components/CoinIcon'
import { useParams } from 'react-router-dom'
import { zerozAfterPoint } from '../utils/createLabels'
import Rate from '../components/Rate'
import MyLoader from '../components/UI/MyLoader/MyLoader'
import { isExist } from '../utils/helper'
import CoinChart from '../components/CoinChart'

const tradingPriceSocket = (
	name: string,
	symbol: string,
	rate: number,
	setRateCoin: Function
) => {
	if (isExist(symbol)) {
		const socket = new WebSocket(
			`wss://fstream.binance.com/stream?streams=${symbol}usdt@ticker/${symbol}usdt@ticker`
		)
		socket.onmessage = (event) => {
			const data = JSON.parse(event.data)
			//console.log(rate, data.data.c)
			if (Math.abs(rate - data.data.c) > 5) {
				// rate принимает за 0
				setRateCoin(data.data.c)
			}
		}
		return socket
	}
}
const CoinCard = () => {
	const { coin } = useParams()
	const { name, symbol, MarketInfo, loading } = useTypedSelector(
		(state) => state.coinInfo
	)
	const {
		marketCap,
		fdmarketCap,
		totalVolume,
		circulatatingSupply,
		maxSupply,
		change,
		rate
	} = MarketInfo
	const { setRateCoin, setNameCoin, fetchCoinInfo } = useActions()
	useEffect(() => {
		const n = coin !== undefined ? coin : ''
		setNameCoin(n)
		fetchCoinInfo(n)
		const socket = tradingPriceSocket(n, getSymbol(n), rate, setRateCoin)
		return () => {
			if (socket !== undefined) socket.close()
		}
	}, [coin])
	if (loading) {
		return <MyLoader />
	}
	return (
		<div className="coin-card">
			<div className="short-info">
				<CoinIcon coin={name} size="60px" />
				<div>
					<div className="coin-name">{name}</div>
					<div className="correlation">{symbol}usd</div>
				</div>
			</div>
			<div className="rate-and-char">
				<Rate
					name={name}
					change={change}
					rate={rate}
					currency="USD"
					numberAfterPoint={getCoinPoints(name)}
					checkChanges={true}
				/>
				<div className="characteristics">
					<div className="char market-cap">
						<p className="value">
							${zerozAfterPoint(marketCap / 1000000000, 3)}B
						</p>
						<p className="name">MARKET CAP</p>
					</div>
					<div className="char market-cap-fd">
						<p className="value">
							${zerozAfterPoint(fdmarketCap / 1000000000, 3)}B
						</p>
						<p className="name">FD MARKET CAP</p>
					</div>
					<div className="char trading-volume">
						<p className="value">
							${zerozAfterPoint(totalVolume / 1000000000, 3)}B
						</p>
						<p className="name">TOTAL VOLUME</p>
					</div>
					<div className="char market-cap">
						{circulatatingSupply > 1000000000 - 1 ? (
							<p className="value">
								$
								{zerozAfterPoint(
									circulatatingSupply / 1000000000,
									3
								)}
								B
							</p>
						) : (
							<p className="value">
								$
								{zerozAfterPoint(
									circulatatingSupply / 1000000,
									3
								)}
								M
							</p>
						)}
						<p className="name">CIRCULATING SUPPLY</p>
					</div>
					<div className="char market-cap">
						{circulatatingSupply > 1000000000 - 1 ? (
							<p className="value">
								${zerozAfterPoint(maxSupply / 1000000000, 3)}B
							</p>
						) : (
							<p className="value">
								${zerozAfterPoint(maxSupply / 1000000, 3)}M
							</p>
						)}
						<p className="name">MAX SUPPLY</p>
					</div>
				</div>
			</div>
			<div className="main">
				<CoinChart name={name} autoUpdate />
			</div>
		</div>
	)
}

export default CoinCard
