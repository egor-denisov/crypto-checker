import React, { FC, useState } from 'react';
import { getSymbol } from '../collection/coins';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { CoinRatesType } from '../types/CoinRatesTypes';
import { getCoinsOutMassiv, getMassivWithNameFromObject, getMatchOfSearching } from '../utils/sortingAndSearchingCoins';
import CoinIcon from './CoinIcon';
import MyInput from './UI/MyInput/MyInput';

type props = {
    value: string,
    setValue: Function,
    condition: string
}
const getMatchItems = (rates: CoinRatesType["rates"], massiv: string[], searchingString: string, limit: number) => {
    return getMatchOfSearching(getMassivWithNameFromObject(getCoinsOutMassiv(rates, massiv)), searchingString).splice(0, limit)
}
const InputWithMatches: FC<props> = ({value, setValue, condition}) => {
    const {rates} = useTypedSelector(state => state.coinRates)
    const {data} = useTypedSelector(state => state.user)
    const [searchingString, setSearchingString] = useState(value)
    const [displayMatches, setDisplayMatches] = useState(false)
    const onTyping = (e: React.FormEvent<HTMLInputElement>) => {
        setSearchingString(e.currentTarget.value)
        if(e.currentTarget.value !== value) setValue("")
    }
    const goMatch = (name: string) => {
        setValue(name)
        setSearchingString(name)
    }
    return (
        <div className='input-with-matches'>
            <MyInput value={searchingString} onChange={onTyping} 
                                             onFocus={() => setDisplayMatches(true)}
                                             condition={condition}
                                             />
            {(displayMatches && searchingString !== value) && 
            <div className='matches'>
                {getMatchItems(rates, data.wallet_keys, searchingString, 3).map(el =>{
                    return <div className='match' key={el.name} onClick={() => goMatch(el.name)}>
                        <div className='icon-and-name'>
                            <CoinIcon coin={el.name} size='40px'/>
                            <div className="name">{el.name}</div>
                        </div>
                        <div className="symbol">
                            {getSymbol(el.name)}
                        </div>
                    </div>    
                })}
            </div>}
        </div>
    );
};

export default InputWithMatches;