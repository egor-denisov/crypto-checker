import React from 'react';
import { getCoinPoints } from '../collection/coins';
import { ChangeType } from '../types/сoinInfoTypes';
import { zerozAfterPoint } from '../utils/createLabels';

const ChangePriceBlock = ({name, changes, onlyProcentage = false}: {name: string, changes: ChangeType, onlyProcentage?: boolean}) => {
    const point = getCoinPoints(name)
    const [change, change_percentage] = [zerozAfterPoint(changes.change, point), zerozAfterPoint(changes.change_percentage, 2)]
    const filling = changes.change > 0 ? `+${change} (+${change_percentage}%)` : `${change} (${change_percentage}%)`
    if(Number(changes.change) === 0){
        return <div className='change change_unaltered'>{onlyProcentage ?`0%` : `0 (0%)`}</div>
    }else if(changes.change > 0){
        return <div className='change change_increase'>{onlyProcentage ?`+${change_percentage}%` :filling}</div>
    }else{
        return <div className='change change_decrease'>{onlyProcentage ?`${change_percentage}%` :filling}</div>
    }
};

export default ChangePriceBlock;