import React, { useState, useEffect, FC } from 'react';
import { getColor, getSymbol } from '../../collection/coins';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { zerozAfterPoint } from '../../utils/createLabels';
import CoinIcon from '../CoinIcon';
import PlusSVG from '../../svg/Plus'
import EditSVG from '../../svg/Edit'
import TrashSVG from '../../svg/Trash'
import WalletAddingAlert from '../WalletAddingAlert';
import { isExist, uniteClasses } from '../../utils/helper';
import CoinContexMenu from './CoinContexMenu';
type props = {
    activePart: string, 
    setActivePart: Function,
    currentBalance: number
}

const LeftWalletMenu: FC<props> = ({activePart, setActivePart, currentBalance}) => {
    const {data} = useTypedSelector(state => state.user)
    const {rates} = useTypedSelector(state => state.coinRates)
    const {vizible} = useTypedSelector(state => state.walletContexMenu)
    const [editMode, setEditMode] = useState(false)
    const [modal, setModal] = useState({vizible: false, activeInput: true})
    const [modalCoin, setModalCoin] = useState('')
    const defaultContexMenu = {coin: '', vizible: vizible, X: 0, Y: 0}
    const [ContextMenu, setContextMenu] = useState(defaultContexMenu)
    const {ChangeWallet, showContexWalletMenu} = useActions()
    const AddOrClose = () => {
        setModalCoin("")
        if(editMode) setEditMode(false)
        else setModal({vizible: true, activeInput: true})
    }
    const deleteFromWallet = (coin: string, e?: React.MouseEvent) => {
        e?.stopPropagation()
        ChangeWallet(coin, {count: 0, price: 0}, data.wallet, data.wallet_id, "delete")
    }
    const editCoinInWallet = (coin: string, e?: React.MouseEvent) => {
        e?.stopPropagation()
        setModal({vizible: true, activeInput: false})
        setModalCoin(coin)
    }
    const goEditMode = () => {
        setEditMode(true)
    }
    const callCoinContextMenu = (e: React.MouseEvent, coin: string) => {
        e.preventDefault()
        showContexWalletMenu()
        setContextMenu({coin: coin, vizible: true, X: e.pageX, Y: e.pageY})
    }
    useEffect(() => setContextMenu({...ContextMenu, vizible: vizible}), [vizible])
    return (
        <>
        {ContextMenu.vizible && 
            <CoinContexMenu goEdit={() => editCoinInWallet(ContextMenu.coin)}
                            goDelete={() => deleteFromWallet(ContextMenu.coin)}
                            left={ContextMenu.X} 
                            top={ContextMenu.Y}/>
        }
        {modal.vizible && 
            <WalletAddingAlert coin={modalCoin} 
                               setVisible={(vizible: boolean) => setModal({...modal, vizible: vizible})} 
                               IsWithInput={modal.activeInput}/>
        }
        <div className='left-wallet-menu'>
            
            <div className={uniteClasses(["item", activePart==="total" && "active"])} 
                 onClick={() => setActivePart("total")}>
                <div className="name">Total</div>
                <div className="total">{zerozAfterPoint(currentBalance, 2)}$</div>
            </div>
            <div className="icons-and-add">
                <div className='mini-icon-coins'>
                    {data.wallet_keys.slice(0, 3).map(coin => 
                        <div className="icon" key={coin}>
                            <CoinIcon coin={coin} size='20px'/>
                        </div>
                    )}
                    {data.wallet_keys.length > 3 && <p>...</p>}
                </div>
                <div className="buttons">
                    {(!editMode && isExist(data.wallet_keys[0])) && <div className="edit-wallet">
                        <EditSVG onClick={goEditMode}/>
                    </div>}
                    <div className="add-to-wallet">
                        <PlusSVG rotate45={editMode && isExist(data.wallet_keys[0])} onClick={AddOrClose}/>
                    </div>
                </div>
            </div>
            <hr/>
            <div className='coins'>
            {isExist(data.wallet_keys[0])
                ? data.wallet_keys.map(coin => {
                    const currentPrice = data.wallet[coin].count*rates[coin].rate
                    return <div className={uniteClasses(["item", activePart===coin && "active"])} 
                                onClick={() => setActivePart(coin)}
                                onContextMenu={(e: React.MouseEvent) => callCoinContextMenu(e, coin)} 
                                key={coin}
                                style={{borderRight: '5px solid' + getColor(coin)+'b3'}}>
                        <div className='icon-and-symbol'>
                            <CoinIcon coin={coin} size='40px'/>
                            <p className='symbol'>{getSymbol(coin)}</p>
                        </div>
                        {editMode
                            ? <div className="buttons">
                                <div className="edit-wallet">
                                    <EditSVG onClick={(e: React.MouseEvent) => editCoinInWallet(coin, e)}/>
                                </div>
                                <div className="delete-fron-wallet">
                                    <TrashSVG onClick={(e: React.MouseEvent) => deleteFromWallet(coin, e)}/>
                                </div>
                            </div>
                            : <p className='total'>{zerozAfterPoint(currentPrice, 2)}$</p>
                        }
                    </div>
                })
                : <p className='walletIsEmpty'>Your wallet is empty!</p>
            }
            </div>
            
        </div>
        </>
    );
};

export default LeftWalletMenu;