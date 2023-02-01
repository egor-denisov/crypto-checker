import React, {useState} from 'react';
import classes from './MyNumber.module.scss'
const MyNumber = ({value, max, changeNumber}: {value: number, max: number, changeNumber: Function}) => {
	const [tempValue, setTempValue] = useState(value)
	const change = (newValue: number) => {
		changeNumber(newValue);
		setTempValue(newValue);
	}
    return <div className={classes.MyNumber}>
	    <div className={classes.numberMinus} onClick={() => {if(value > 1) changeNumber(value-1)}}>-</div>
	    <input className={classes.number} type="text"  
										  min="1"  
										  max={max} 
										  step="1" 
										  value={value} 
										  onChange={e => {
											const newValue = Number(e.target.value)
											if(newValue){
												if(newValue <= max && newValue > 0) change(newValue)
												else change(newValue-10*tempValue)
											}
										  }}
										  onPaste={e => e.preventDefault()}
		/>
	    <div className={classes.numberPlus} onClick={() => {if(value+1 <= max) changeNumber(value+1)}}>+</div>
    </div>
};

export default MyNumber;