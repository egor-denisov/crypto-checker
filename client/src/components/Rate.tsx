import React, { useEffect, useState } from 'react'
import { ChangeType, MarketInfoType } from '../types/сoinInfoTypes'
import { zerosAfterPoint } from '../utils/helper'
import { uniteClasses } from '../utils/helper'
import ChangePriceBlock from './ChangePriceBlock'

const Rate = ({
	name,
	change,
	rate,
	currency,
	numberAfterPoint,
	checkChanges
}: {
	name: string
	change: MarketInfoType['change']
	rate: number
	currency: string
	numberAfterPoint: number
	checkChanges: boolean
}) => {
	const [tempRate, setTempRate] = useState(
		Number(zerosAfterPoint(rate, numberAfterPoint))
	)
	const [changeAnim, setChangeAnim] = useState({
		active: false,
		symbols: 0,
		change: 'none'
	})
	const changes: ChangeType = {
		change: change.price_change_24h,
		change_percentage: change.price_change_percentage_24h
	}
	useEffect(() => {
		if (rate !== 0 && checkChanges) {
			const diff = rate - tempRate
			let length = 0
			while (
				rate.toString()[length] === tempRate.toString()[length] &&
				length <= rate.toString().length
			) {
				length += 1
			}
			setChangeAnim({
				active: true,
				symbols: length - 1,
				change: Number(diff) >= 0 ? 'increase' : 'decrease'
			})
		}
		setTempRate(rate)
	}, [rate])
	return (
		<div className="rate">
			<div className="rate-block">
				{changeAnim
					? zerosAfterPoint(rate, numberAfterPoint)
							.split('')
							.map((number, id) => {
								if (number === '.')
									return (
										<div className="point-of-rate" key={id}>
											{number}
										</div>
									)
								if (changeAnim.symbols < id) {
									return (
										<div
											className={uniteClasses([
												changeAnim.change,
												'number-of-rate'
											])}
											key={id}
										>
											{number}
										</div>
									)
								} else {
									return (
										<div
											className="number-of-rate"
											key={id}
										>
											{number}
										</div>
									)
								}
							})
					: zerosAfterPoint(rate, numberAfterPoint)
							.toString()
							.split('')
							.map((number, id) => {
								return (
									<div className="number-of-rate" key={id}>
										{number}
									</div>
								)
							})}
				<div className="currency">{currency}</div>
			</div>
			<ChangePriceBlock name={name} changes={changes} />
		</div>
	)
}

export default Rate
