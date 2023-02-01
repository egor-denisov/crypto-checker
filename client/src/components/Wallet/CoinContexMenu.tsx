import React, { FC, useState, useEffect, useRef } from 'react';
import EditSVG from '../../svg/Edit'
import TrashSVG from '../../svg/Trash'
type props = {
    goEdit: Function,
    goDelete: Function,
    left: number,
    top: number
}
const getStyle = (left: number, top: number, ref: React.RefObject<HTMLDivElement>) => {
    const heightContexMenu = ref.current !== null ? ref.current["clientHeight"] : 0
    return {"left": left+"px", "top": (window.innerHeight < top+heightContexMenu ? top-heightContexMenu : top) +"px"}
}
const CoinContexMenu: FC<props> = ({goEdit, goDelete, left, top}) => {
    const menuRef = useRef(null)
    const [style, setStyle] = useState(getStyle(left, top, menuRef))
    useEffect(() => {
        setStyle(getStyle(left, top, menuRef))
    }, [left, top])
    return (
        <div className='contex-coin-menu' style={style} ref={menuRef}>
            <div className='item edit' onClick={() => goEdit()}>
                <p>Edit</p>
                <EditSVG/>
            </div>
            <div className='item delete' onClick={() => goDelete()}>
                <p>Delete</p>
                <TrashSVG/>
            </div>
        </div>
    );
};

export default CoinContexMenu;