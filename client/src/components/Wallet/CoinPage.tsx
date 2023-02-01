import React, { FC, useEffect, useState } from 'react';
import { getSymbol } from '../../collection/coins';
import { WalletElementType } from '../../types/userTypes';
import { ChangeType } from '../../types/сoinInfoTypes';
import { zerozAfterPoint } from '../../utils/createLabels';
import ChangePriceBlock from '../ChangePriceBlock';
import CoinIcon from '../CoinIcon';
import MyChart from '../MyChart/MyChart';
type props = {
    coin: string,
    wallet: WalletElementType,
    price: number
}
const getStatistics = ({wallet, price} : Omit<props, "coin">): ChangeType => {
    const change = price - wallet.price
    return {
            change: zerozAfterPoint(change, 2), 
            change_percentage: zerozAfterPoint((change/wallet.price) * 100, 2)
        }
}
const CoinPage: FC<props> = ({coin, wallet, price}) => {
    const [statistics, setStatistics] = useState(getStatistics({wallet, price}))
    useEffect(() => {
        setStatistics(getStatistics({wallet, price}))
    }, [wallet, price])
    return (
        <div className='wallet-coin-page'>
            <div className='title-and-more'>
                <div className='title-and-icon'>
                    <CoinIcon coin={coin} size="48px"/>
                    <p className='title'>{coin}</p>
                </div>
                <a className='more' href={`/coins/${coin}`}>{`More about coin >`}</a>
            </div>
            <div className="price-count-and-statistics">
                <div className="count-and-price">
                    <p className='count'>{wallet.count} {getSymbol(coin)}</p>
                    <p className='current-price'>≈ {wallet.count*price}$</p>
                </div>
                <div className="statistics">
                    <ChangePriceBlock name={coin} changes={statistics}/>
                    <p>In your wallet</p>
                </div>
            </div>
            <div className="chart">
                <MyChart name={coin}/>
            </div>
        </div>
    );
};

export default CoinPage;