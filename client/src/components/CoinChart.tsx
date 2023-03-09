import { FC } from 'react'
import ChartNavbar from './MyChart/ChartNavbar'
import MyChart from './MyChart/MyChart'
type props = {
	name: string
	withoutNavbar?: boolean
	autoUpdate?: boolean
}
const CoinChart: FC<props> = ({
	name,
	withoutNavbar = false,
	autoUpdate = false
}) => {
	return (
		<div className="chart" key={name}>
			<MyChart name={name} autoUpdate={autoUpdate} />
			{!withoutNavbar && <ChartNavbar />}
		</div>
	)
}

export default CoinChart
