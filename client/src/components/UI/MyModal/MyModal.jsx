import React from 'react';
import { uniteClasses } from '../../../utils/helper';
import classes from './MyModal.module.scss'
const MyModal = ({setVisible, className="", children}) => {
    return (
        <div className={classes.MyModal} onClick={() => setVisible(false)}>
            <div className={uniteClasses([classes.content, className])} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default MyModal;