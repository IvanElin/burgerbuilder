import React from 'react';
import classes from './Input.module.css';

const input = (props) => {

    let inputElem = null;
    const inputClasses = [classes.InputElem];
    let validationError = null;

    if ( props.invalid && props.shouldValidate && props.touched ) {
        inputClasses.push(classes.Invalid);
        validationError = <span className={classes.ErrorMessage}>Please enter a valid value</span>

    }

    switch (props.elementType) {
        case ('input'):
            inputElem = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed}/>;
            break;
        case ('textarea'):
            inputElem = <textarea className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed}/>;
            break;
        case ('select'):
            inputElem = (<select 
                className={inputClasses.join(' ')} 
                value={props.value} onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>{option.displayValue}</option>
                    ))}
                </select>);
            break;
        
        default:
            inputElem = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed}/>
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElem}
            {validationError}
        </div>
    )
} 


export default input;