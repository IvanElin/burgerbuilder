import React from 'react';

import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <div className={classes.Container}>
        <div className={classes.Sections}>
            <div className={classes.IngridientsSection}>
                    {controls.map(ctrl => (
                        <BuildControl 
                            key={ctrl.label} 
                            label={ctrl.label}
                            added={() => props.ingredientAdded(ctrl.type)}
                            removed={() => props.ingredientRemoved(ctrl.type)}
                            disabled={props.disabled[ctrl.type]} />
                    ))}
            </div>

            <div className={classes.OrderSection}>
                <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
                <button 
                    className={classes.OrderButton}
                    disabled={!props.purchasable}
                    onClick={props.ordered}>{ props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}</button>
            </div>       
        </div>

        </div>
    </div>
);

export default buildControls;