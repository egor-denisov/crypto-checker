export const options = {
	plugins: {
		legend: {
			display: false
		},
		tooltip: {
			intersect: false,
			displayColors: false,
			bodyFont: {
				size: 20
			},
			callbacks: {
				label: (context: any) => {
					let label = context.dataset.label || ''
					if (context.parsed !== null) {
						label += `${context.parsed.y}$`
					}
					return label
				}
			}
		}
	},
	scales: {
		x: {
			display: false
		},
		y: {
			position: 'right' as const
		}
	}
}
export const defaultChartData = {
	labels: [],
	datasets: [
		{
			label: '',
			tension: 0.3,
			data: [],
			borderColor: 'rgb(59, 65, 60)',
			backgroundColor: 'rgb(59, 65, 60, 0.8)',
			pointRadius: 0,
			hoverRadius: 4
		},
		{
			label: '',
			data: [],
			borderColor: 'rgb(59, 65, 60)',
			spanGaps: true,
			segment: {
				borderColor: 'rgb(0,0,0,0.4)',
				borderDash: [3, 3]
			},
			tooltip: false,
			pointRadius: 0,
			backgroundColor: 'rgb(59, 65, 60, 0.8)'
		}
	]
}
