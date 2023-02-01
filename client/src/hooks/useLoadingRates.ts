import { useEffect } from 'react';
import { isExist } from "../utils/helper";
import { useActions } from "./useActions";
import { useTypedSelector } from "./useTypedSelector";

export const useLoadingRates = () => {
    const {rates} = useTypedSelector(state => state.coinRates)
    const {fetchCoinRates, setNameCoin} = useActions()
    useEffect(() => {
        setNameCoin('')
        if(!isExist(Object.keys(rates)[0])) fetchCoinRates()
    }, [])
}