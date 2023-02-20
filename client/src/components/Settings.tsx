import React, { FC, useState } from 'react';
import MyModal from './UI/MyModal/MyModal';

type props = {
    visible: boolean, 
    setVisible: Function
}
const Settings: FC<props> = ({visible, setVisible}) => {
    if(!visible) return <></>
    return (
        <MyModal setVisible={setVisible}>

        </MyModal>
    );
};

export default Settings;