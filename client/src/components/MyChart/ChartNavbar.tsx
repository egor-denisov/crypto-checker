import React, { FC } from 'react';

const periodsName = ['1D', '5D', '1M', '3M', '6M', '1Y', '5Y']
const periodsTime = [1, 5, 30, 90, 180, 360, 1800]
type props = {
    period: number,
    setPeriod: Function
}
const ChartNavbar: FC<props> = ({period, setPeriod}) => {
    return (
        <div className='chart-navbar'>
            {periodsTime.map((item, index) => {
                const classes = (item === period) ?"navbar-item active" : "navbar-item"
                return <p key={index} className={classes} onClick={() => setPeriod(item)}>{periodsName[index]}</p>
            })}
        </div>
    );
};

export default ChartNavbar;