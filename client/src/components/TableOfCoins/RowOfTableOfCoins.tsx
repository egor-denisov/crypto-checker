import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCoinPoints, getSymbol } from '../../collection/coins';
import { zerozAfterPoint } from '../../utils/createLabels';
import ChangePriceBlock from '../ChangePriceBlock';
import CoinIcon from '../CoinIcon';
import StarSVG from '../../svg/Star'
import WalletSVG from '../../svg/Wallet'
import { UserDataType } from '../../types/userTypes';
import { useActions } from '../../hooks/useActions';
import WalletAddingAlert from '../WalletAddingAlert';
import { rateWithNameType } from '../../types/CoinRatesTypes';
import { isExist, uniteClasses } from '../../utils/helper';
type props = {
    coinsData: rateWithNameType,
    userData: UserDataType,
    showWahlistButton?: boolean, 
    showWalletButton?: boolean
}
const RowOfTableOfCoins = ({coinsData, userData, showWahlistButton, showWalletButton} : props) => {
    const {name, rate, priceChange, priceChangePercent, marketCap, totalVolume} = coinsData
    const {washlist_id, washlist, wallet_id, wallet, wallet_keys} = userData
    const changes = {change: priceChange, change_percentage: priceChangePercent}
    const [activeWashlist, setActiveWashlist] = useState(!washlist.includes(name))
    const [activeWallet, setActiveWallet] = useState(!isExist(wallet[name]))
    const [vizibleWalletAlert, setVizibleWalletAlert] = useState(false)
    const {ChangeWashlist} = useActions()
    const goChangeWashlist = (e: React.MouseEvent) => {
        e.preventDefault()
        ChangeWashlist(name, washlist, washlist_id, activeWashlist ? "delete" : "add")
    }
    const goChangeWallet = (e: React.MouseEvent) => {
        e.preventDefault()
        setVizibleWalletAlert(true)
    }
    useEffect(() => setActiveWashlist(!activeWashlist), [washlist.includes(name)])
    useEffect(() => setActiveWallet(!activeWallet), [wallet_keys.includes(name)])
    return (
        <>
        {vizibleWalletAlert && <WalletAddingAlert coin={name} 
                                                  setVisible={setVizibleWalletAlert} 
                                                  IsWithInput={false}/>
        }
        <Link to={"coins/"+name}>
        <div className='row-of-table-of-coins'>
            
            <div className="logo-symbol-name">
                <CoinIcon coin={name} size='40px'/>
                <p className='symbol'>{getSymbol(name)}</p>
                <p className='name'>{name}</p>
            </div>
            <div className="price">
                ${zerozAfterPoint(rate, getCoinPoints(name))}
            </div>
            <div className="change">
                <ChangePriceBlock name={name} changes={changes} onlyProcentage/>
            </div>
            <div className="marketCap">
                ${zerozAfterPoint(marketCap/1000000000, 3)}B
            </div>
            <div className="totalVolume">
                ${zerozAfterPoint(totalVolume/1000000000, 3)}B
            </div>
            <div className="buttons">
                {showWalletButton && 
                <div className={uniteClasses(["walletButton", activeWallet && 'active'])} 
                     onClick={goChangeWallet}>
                    <WalletSVG title="Add to wallet" plus={!activeWallet}/>
                </div>}
                {showWahlistButton && 
                <div className={uniteClasses(["washlistButton", activeWashlist && 'active'])} 
                     onClick={goChangeWashlist}>
                    <StarSVG title="Add to washlist"/>
                </div>}
            </div>
        </div>
        </Link>
        </>
    );
};

export default RowOfTableOfCoins;