import React, {useEffect} from 'react';
import { sortings } from '../collection/sortings';
import ArrowDownSVG from '../svg/ArrowDown'
import ArrowUpSVG from '../svg/ArrowUp'
import GridSVG from '../svg/Grid'
import RowsSVG from '../svg/Rows'
import SearchSVG from '../svg/Search'
import MyInput from './UI/MyInput/MyInput';
import MySelect from './UI/MySelect/MySelect';
const SortingNavbar = ({typeOfSorting, setTypeOfSorting, searchString, setSearchString, inputType, setInputType, sortingDirection, setSortingDirection} : 
                       {typeOfSorting: string, setTypeOfSorting: Function, 
                        searchString: string, setSearchString: Function, 
                        inputType: string, setInputType: Function,
                        sortingDirection: string, setSortingDirection: Function
                        }
) => {
    useEffect(() => setTypeOfSorting(typeOfSorting), [typeOfSorting])
    return (
        <div className='coins-navbar'>
            <div className="selectShowing">
                <GridSVG onClick={() => setInputType("cards")} className={inputType==="cards" ?"active" :""} />
                <RowsSVG onClick={() => setInputType("table")} className={inputType==="table" ?"active" :""}/>
            </div>
            <div className='search'>

                <MyInput placeholder="Find by name" value={searchString} onChange={(e:any) => setSearchString(e.target.value)}>
                    <SearchSVG/>
                </MyInput>
            </div>
            <div className="selectSorting">
                <MySelect value={typeOfSorting} onChange={(e:any) => setTypeOfSorting(e.target.value)}>
                    <option value="Type of sorting" disabled>Type of sorting</option>
                    {sortings.map( sorting => { return <option value={sorting} key={sorting}>{sorting}</option> })}
                </MySelect>
                <div className="toggleDirection">
                    <ArrowDownSVG onClick={() => setSortingDirection("descending")} className={sortingDirection==="descending" ?"active" :""} />
                    <ArrowUpSVG onClick={() => setSortingDirection("ascending")} className={sortingDirection==="ascending" ?"active" :""} />
                </div>
            </div>
        </div>
    );
};

export default SortingNavbar;