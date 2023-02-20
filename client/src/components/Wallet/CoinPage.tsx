import React, { FC, useEffect, useState } from 'react';
import { getSymbol } from '../../collection/coins';
import { WalletElementType } from '../../types/userTypes';
import { ChangeType } from '../../types/сoinInfoTypes';
import { zerozAfterPoint } from '../../utils/createLabels';
import ChangePriceBlock from '../ChangePriceBlock';
import CoinChart from '../CoinChart';
import CoinIcon from '../CoinIcon';
import WalletDropdown from './WalletDropdown';
type props = {
    coin: string,
    wallet: WalletElementType,
    price: number,
    deleteFromWallet: Function,
    editCoinInWallet: Function
}
const getStatistics = ({wallet, price} : Pick<props, "wallet" | "price">): ChangeType => {
    const change = price - wallet?.price
    return {
            change: zerozAfterPoint(change, 2), 
            change_percentage: zerozAfterPoint((change/wallet?.price) * 100, 2)
        }
}
const CoinPage: FC<props> = ({coin, wallet, price, deleteFromWallet, editCoinInWallet}) => {
    const [statistics, setStatistics] = useState(getStatistics({wallet, price}))
    useEffect(() => {
        setStatistics(getStatistics({wallet, price}))
    }, [wallet, price])
    return (
        <div className='wallet-page wallet-coin-page'>
            <div className="header">
                <div className='title-and-dropdown'>
                    <div className='title-and-icon'>
                        <CoinIcon coin={coin} size="48px"/>
                        <p className='title'>{coin}</p>
                    </div>
                    <WalletDropdown coin={coin}
                                    deleteFromWallet={deleteFromWallet}
                                    editCoinInWallet={editCoinInWallet}
                                    />
                </div>
                <div className="price-count-and-statistics">
                    <div className="count-and-price">
                        <p className='count'>{wallet?.count} {getSymbol(coin)}</p>
                        <p className='current-price'>≈ {wallet?.count*price}$</p>
                    </div>
                    <div className="statistics">
                        <ChangePriceBlock name={coin} changes={statistics}/>
                        <p>In your wallet</p>
                    </div>
                </div>
            </div>
            <div className="main">
                <CoinChart name={coin} withoutNavbar/>
            </div>
        </div>
    );
};

export default CoinPage;