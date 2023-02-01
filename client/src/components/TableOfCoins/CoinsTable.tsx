import React from 'react';
import { rateWithNameType } from '../../types/CoinRatesTypes';
import RowOfTableOfCoins from './RowOfTableOfCoins';
import { UserDataType } from '../../types/userTypes'
import { isExist } from '../../utils/helper';

type props = {
    massivOfCoins: rateWithNameType[], 
    userData: UserDataType,
    children?: React.ReactNode, 
    showWahlistButton?: boolean, 
    showWalletButton?: boolean
}
const CoinsTable = ({massivOfCoins, userData, children, showWahlistButton=true, showWalletButton=true}: props) => {
    return (
        <div className='table-of-coins'>
            {children}
            <div>
            {massivOfCoins.map( (data: rateWithNameType, order) => {
                if(!isExist(data)) return <div className='row-of-table-of-coins-clear' key={order}></div>
                return <RowOfTableOfCoins   key={data.name} 
                                            coinsData={data}
                                            userData={userData}
                                            showWahlistButton={showWahlistButton}
                                            showWalletButton={showWalletButton}
                />
            })}
            </div>
        </div>
    );
};

export default CoinsTable;