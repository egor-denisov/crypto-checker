import React, { FC, useState } from 'react';
import ChartNavbar from './MyChart/ChartNavbar';
import MyChart from './MyChart/MyChart';
type props = {
    name: string,
    withoutNavbar?: boolean,
    defaultPeriod?: number
}
const CoinChart: FC<props> = ({name, defaultPeriod=30, withoutNavbar=false}) => {
    const [period, setPeriod] = useState(defaultPeriod)
    return (
        <div className="chart">
            <MyChart name={name} period={period}/>
            {!withoutNavbar && <ChartNavbar period={period} setPeriod={setPeriod}/>}
        </div>
    );
};

export default CoinChart;