import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UserSVG from '../svg/User'
import SettingsSVG from '../svg/Settings'
import UserAuth from './UserAuth';
import { uniteClasses } from '../utils/helper';

const Header = ({active}: {active?: string}) => {
    const [visible, setVizible] = useState(false)
    return (
        <div className='header'>
            <Link to='/' className='logo'>CryptoChecker</Link>
            <div className="menu">
                <Link to='/coins' className={uniteClasses(['menu-item', active==='coins' && 'active'])}>Coins<hr/></Link>
                <Link to='/news' className={uniteClasses(['menu-item', active==='news' && 'active'])}>News<hr/></Link>
                <Link to='/washlist' className={uniteClasses(['menu-item', active==='washlist' && 'active'])}>Washlist<hr/></Link>
                <Link to='/wallet' className={uniteClasses(['menu-item', active==='wallet' && 'active'])}>Wallet<hr/></Link>
                <div className="icons menu-item">
                    <UserSVG strokeWidth={1.2} onClick={() => setVizible(true)}/>
                    <SettingsSVG strokeWidth={1.2}/>
                </div>
            </div>
            <UserAuth visible={visible} setVisible={setVizible}/>
        </div>
    );
};

export default Header;