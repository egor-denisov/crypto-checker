import React from 'react';
import classes from './MySelect.module.scss'
const MySelect = ({children, ...props}) => {
    return (
        <select className={classes.MySelect} {...props}>
            {children}
        </select>
    );
};

export default MySelect;