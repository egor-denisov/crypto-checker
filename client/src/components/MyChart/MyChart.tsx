import React, { FC, useEffect, useState, useRef } from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  } from "chart.js";
import { createLabelsWithOutTime, createLabelsWithTime, getChartValues, getLineValues } from '../../utils/createLabels';
import { options, defaultChartData } from './settings';
import { useLoadingRates } from '../../hooks/useLoadingRates';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
type props = {
  name: string,
  period: number,
  autoUpdate?: boolean
}


const MyChart: FC<props> = ({name, period, autoUpdate=false}) => {
    const {error, loading, prices, labels} = useTypedSelector(state => state.chart)
    const lastLoadingRate = useTypedSelector(state => state.coinRates.rates[name]?.rate)
    const currentRate = useTypedSelector(state => state.coinInfo.MarketInfo.rate)
    const [rate, setRate] = useState(lastLoadingRate)
    const {fetchChart} = useActions()
    const [chartData, setChartData]: [typeof defaultChartData, Function] = useState(defaultChartData)
    useEffect( () => {
        fetchChart(period, name)
    }, [period, name])
    useEffect( () => {
      setChartData({...chartData, labels: [...(period < 180 ?createLabelsWithTime(labels) : createLabelsWithOutTime(labels))], datasets: [{...chartData.datasets[0], data: [...prices, rate]}, 
                   {...chartData.datasets[1], data: getLineValues(prices[prices.length - 1], prices)}]})
    }, [labels, prices])
    useEffect(() => {
      if(!autoUpdate) return 
      setChartData({...chartData, datasets: [{...chartData.datasets[0], data: getChartValues(currentRate, prices)}, {...chartData.datasets[1], data: getLineValues(currentRate, prices)}]})
    }, [currentRate])
    useLoadingRates()
    if (loading) {
        return <h1>Loading...</h1>
    }
    return <div className='my-chart'>
      <Line options={options} 
            data={chartData} 
            height={100} 
            updateMode="resize"
      />
      </div>
};
export default MyChart;