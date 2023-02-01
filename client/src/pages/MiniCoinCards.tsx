import React, {useState, useEffect, FC} from 'react';
import MiniCoinCard from '../components/MiniCoinCard';
import { getCountOfPages } from '../utils/sortingAndSearchingCoins';
import SortingNavbar from '../components/CoinsNavbar';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import TitleOfTableOfCoins from '../components/TableOfCoins/TitleOfTableOfCoins';
import { coins } from '../collection/coins';
import { rateWithNameType } from '../types/CoinRatesTypes';
import Pagination from '../components/Pagination';
import MyLoader from '../components/UI/MyLoader/MyLoader';
import CoinsTable from '../components/TableOfCoins/CoinsTable';
import { useTrackerCoinTable } from '../hooks/useTrackerCoinTable';
import { isExist } from '../utils/helper';
import { useLoadingRates } from '../hooks/useLoadingRates';

const MiniCoinCards: FC = () => {
    const [inputType, setInputType] = useState("table")
    const [pagination, setPagination] = useState({page: 0, limit: 9, countOfPages: getCountOfPages(9, coins.size)})
    const {rates, loading} = useTypedSelector(state => state.coinRates)
    const {data} = useTypedSelector(state => state.user)
    useLoadingRates()
    const {typeOfSorting, setTypeOfSorting, 
        sortingDirection, setSortingDirection, 
        searchString, setSearchString, 
        massivOfCoins} = useTrackerCoinTable(rates, pagination, setPagination, data, loading)
        
    if(loading && Object.keys(rates).length !== coins.size) return <MyLoader/>
    return (
        <div className='main'>
            <SortingNavbar typeOfSorting={typeOfSorting} 
                           setTypeOfSorting={setTypeOfSorting} 
                           searchString={searchString} 
                           setSearchString={setSearchString}
                           inputType={inputType}
                           setInputType={setInputType}
                           sortingDirection={sortingDirection}
                           setSortingDirection={setSortingDirection}
            />
            {inputType === "cards"
                ? <div className='mini-coin-cards'>
                {massivOfCoins.map( (data: rateWithNameType) => {
                    if(!isExist(data)) return <div className='row-of-table-of-coins-clear'></div>
                    return <MiniCoinCard    key={data.name} 
                                            coin={data.name} 
                                            rate={data.rate} 
                                            change={{price_change_24h: data.priceChange, 
                                                    price_change_percentage_24h: data.priceChangePercent
                                                    }}
                                            marketCap={data.marketCap}
                                            totalVolume={data.totalVolume}
                    />
                })}
                </div>
                : 
                <CoinsTable massivOfCoins={massivOfCoins} userData={data}>
                    <TitleOfTableOfCoins typeOfSorting={typeOfSorting} 
                                         setTypeOfSorting={setTypeOfSorting} 
                                         sortingDirection={sortingDirection} 
                                         setSortingDirection={setSortingDirection}/>
                </CoinsTable>
                
            }
        <Pagination pagination={pagination} setPagination={setPagination} />
        </div>
    );
};

export default MiniCoinCards;