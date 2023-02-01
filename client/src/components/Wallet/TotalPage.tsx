import React, { FC, useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { getColor } from '../../collection/coins';
import { isExist } from '../../utils/helper';
import { zerozAfterPoint } from '../../utils/createLabels';

ChartJS.register(ArcElement, Tooltip, Legend);
export const defaultOptions = {
    plugins: {
      legend: {
          display: false,
      },
      tooltip: {
        enabled: true,
        intersect: false,
        displayColors: false,
        bodyFont:{
            size: 20
        },
        backgroundColor: 'rgba(59, 65, 60, 0.9)',
        callbacks: {
          label: (context: any) => {
              let label = context.dataset.label || '';
              if (context.parsed !== null) {
                  label += `${context.label[0]?.toUpperCase() + context.label.slice(1)}: ${context.parsed}%`;
              }
              return label;
          },
          title: () => ''
        }
      }
    }
};

export const defaultChartData = {
  labels: [''],
  datasets: [
    {
      label: '',
      data: [0],
      backgroundColor: [''],
      borderWidth: 2
    },
  ],
  hoverOffset: 4
}
type props = {
  walletPercentage: number[],
  currentBalance: number
}
const TotalPage: FC<props> = ({walletPercentage, currentBalance}) => {
    const [chartData, setChartData] = useState(defaultChartData)
    const [options, setOptions] = useState(defaultOptions)
    const {data} = useTypedSelector(state => state.user)
    const {rates} = useTypedSelector(state => state.coinRates)
    useEffect(() => {
        if(!isExist(data.wallet_keys[0])) setChartData({...defaultChartData, datasets:[{...defaultChartData.datasets[0], data: [100], backgroundColor: ['#959595e6'], borderWidth: 0}]})
        else{
          const coinAndColor: {[coin: string]: string} = {}
          const labels = Object.keys(data.wallet).sort((a, b) => rates[a].rate*data.wallet[a].count > rates[b].rate*data.wallet[b].count ?-1 : 1)
          labels.forEach( el => {
            coinAndColor[el] = getColor(el)+'e6'
          })
          const datasets = [{...defaultChartData.datasets[0], data: walletPercentage.sort((a,b) => a<b ? 1 : -1), backgroundColor: Object.values(coinAndColor)}]
          setChartData({...defaultChartData, labels: labels, datasets: datasets})
        }
    }, [data.wallet, rates, walletPercentage])
    useEffect(() => {
      if(isExist(data.wallet_keys[0])) setOptions(defaultOptions)
      else setOptions({...defaultOptions, plugins: 
        {...defaultOptions.plugins, tooltip: {...defaultOptions.plugins.tooltip, enabled: false}}
      })
    }, [isExist(data.wallet_keys[0])])
    return (
        <div className='wallet-total'>
            <div className='title'>Total</div>
            <div className='chart-doughnut'>
              <div className="balance">${zerozAfterPoint(currentBalance, 2)}</div>
              <Doughnut data={chartData} options={options}/>
            </div>
        </div>
    );
};

export default TotalPage;