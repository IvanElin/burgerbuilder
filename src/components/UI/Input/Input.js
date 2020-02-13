import React from 'react';
import classes from './Input.module.css';

const input = (props) => {

    let inputElem = null;
    switch (props.elementType) {
        case ('input'):
            inputElem = <input className={classes.InputElem} {...props.elementConfig} value={props.value} onChange={props.changed}/>;
            break;
        case ('textarea'):
            inputElem = <textarea className={classes.InputElem} {...props.elementConfig} value={props.value} onChange={props.changed}/>;
            break;
        case ('select'):
            inputElem = (<select 
                className={classes.InputElem} 
                value={props.value} onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>{option.displayValue}</option>
                    ))}
                </select>);
            break;
        
        default:
            inputElem = <input className={classes.InputElem} {...props.elementConfig} value={props.value} onChange={props.changed}/>
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElem}
        </div>
    )
} 


export default input;