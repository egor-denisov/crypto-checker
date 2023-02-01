import React, { useEffect, useState } from 'react';
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

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );



const MyChart = ({name} : {name: string}) => {
    const {error, loading, prices, labels, period} = useTypedSelector(state => state.chart)
    const {MarketInfo} = useTypedSelector(state => state.coinInfo)
    const {rate} = MarketInfo
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
      setChartData({...chartData, datasets: [{...chartData.datasets[0], data: getChartValues(rate, prices)}, {...chartData.datasets[1], data: getLineValues(rate, prices)}]})
    }, [rate])
    if (loading) {
        return <h1>Loading...</h1>
    }
    return <div className='my-chart'><Line options={options} data={chartData} height={100} updateMode="resize"/></div>
};
export default MyChart;