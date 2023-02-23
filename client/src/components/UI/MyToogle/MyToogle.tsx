import { FC } from 'react';
import MyButton from '../MyButton/MyButton';
import classes from './MyToogle.module.scss'

type props = {
    firstItem: string, 
    secondItem: string,
    firstIsActive: boolean,
    changer: Function
}

const MyToogle: FC<props> = ({firstItem, secondItem, firstIsActive, changer}) => {
    return (
        <div className={classes.MyToogle}>
            <MyButton className={!firstIsActive && classes.disable} 
                      onClick={() => !firstIsActive && changer()}
            >
                {firstItem}
            </MyButton>
            <MyButton className={firstIsActive && classes.disable} 
                      onClick={() => firstIsActive && changer()}
            >
                {secondItem}
            </MyButton>
        </div>
    );
};

export default MyToogle;