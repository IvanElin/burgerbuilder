import React from 'react';
import classes from './Order.module.css';

const order = (props) => {

     const ingredients = [];

     for (let ingName in props.ingredients) {
         ingredients.push(
             {
             name: ingName, 
             amount: props.ingredients[ingName]
            }
        )
     }

     const ingredientsOutput = ingredients.map(ing => {
        return  <span className={classes.Ingredient} key={ing.name}> {ing.name} ({ing.amount}) </span>
     })

    return (
        <div className={classes.Order}>
         <p>Ingredients: {ingredientsOutput} </p>   
        <p>Price: <strong>$ {props.price.toFixed(2)}</strong> </p>
        </div>

    );
        
};


export default order;