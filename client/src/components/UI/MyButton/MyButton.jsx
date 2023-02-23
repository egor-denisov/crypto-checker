import React from 'react';
import { uniteClasses } from '../../../utils/helper';
import classes from './MyButton.module.scss'
const MyButton = ({children, className='', ...props}) => {
    return (
        <button className={uniteClasses([classes.MyButton, className]) } {...props}>
            {children}
        </button>
    );
};

export default MyButton;