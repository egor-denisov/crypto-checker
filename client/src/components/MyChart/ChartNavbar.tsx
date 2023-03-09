import React, { FC } from 'react'
import { useActions } from '../../hooks/useActions'
import { useTypedSelector } from '../../hooks/useTypedSelector'

const periodsName = ['1D', '5D', '1M', '3M', '6M', '1Y', '5Y']
const periodsTime = [1, 5, 30, 90, 180, 360, 1800]

const ChartNavbar: FC = () => {
	const period = useTypedSelector((state) => state.chart.period)
	const { setChartPeriod } = useActions()
	return (
		<div className="chart-navbar">
			{periodsTime.map((item, index) => {
				const classes =
					item === period ? 'navbar-item active' : 'navbar-item'
				return (
					<p
						key={index}
						className={classes}
						onClick={() => setChartPeriod(item)}
					>
						{periodsName[index]}
					</p>
				)
			})}
		</div>
	)
}

export default ChartNavbar
