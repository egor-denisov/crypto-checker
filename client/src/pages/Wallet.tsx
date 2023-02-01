import React, { useEffect, useState } from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector';
import LeftWalletMenu from '../components/Wallet/LeftWalletMenu';
import { zerozAfterPoint } from '../utils/createLabels';
import { useLoadingRates } from '../hooks/useLoadingRates';
import TotalPage from '../components/Wallet/TotalPage';
import CoinPage from '../components/Wallet/CoinPage';

const Wallet = () => {
    const [activePart, setActivePart] = useState('total')
    const [walletPercentage, setWalletPercentage] = useState([100])
    const {data} = useTypedSelector(state => state.user)
    const {rates} = useTypedSelector(state => state.coinRates)
    const [currentBalance, setCurrentBalance] = useState(data.wallet_keys.reduce((sum, coin) => sum + data.wallet[coin].count*rates[coin].rate, 0))
    useEffect(() => {
        const summ = data.wallet_keys.reduce((sum, el) => sum + data.wallet[el].price*data.wallet[el].count, 0)
        const precentege = data.wallet_keys.map(el => zerozAfterPoint((data.wallet[el].price*data.wallet[el].count*100)/summ, 2))
        setWalletPercentage(precentege)
    }, [data.wallet])
    useEffect(() => {
        setCurrentBalance(data.wallet_keys.reduce((sum, coin) => sum + data.wallet[coin].count*rates[coin].rate, 0))
    }, [data.wallet, rates])
    useLoadingRates()
    return (
        <div className="wallet">
            <LeftWalletMenu activePart={activePart} 
                            setActivePart={setActivePart}
                            currentBalance={currentBalance}/>
            <div className='wallet-content'>
                {activePart==="total" 
                    ? <TotalPage walletPercentage={walletPercentage} currentBalance={currentBalance}/>
                    : <CoinPage coin={activePart} wallet={data.wallet[activePart]} price={rates[activePart].rate}/>
                }
            </div>
        </div>
    );
};

export default Wallet;