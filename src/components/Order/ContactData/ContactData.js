import React, { Component } from 'react';
import classes from './ContactData.module.css';

import Button from '../../UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../UI/Spinner/Spinner';
import Input from '../../UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },

            city: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'City'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'default', displayValue: 'Default'},
                    ]
                },
                value: ''
            } 
        
        },

        loading: false
    }

    orderConfirmHandler = (event) => {
        event.preventDefault();
        
        this.setState({ loading: true });
        const order = {
            ingridients: this.props.ingredients,
            price: this.props.price
            
        }

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false})
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({loading: false})
            });

    } 

    render() {
        const formElementArray = [];

        for (let key in this.state.orderForm) {
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (
            <form>
            
                {formElementArray.map(elem => (
                    <Input 
                    key={elem.id}
                    elementType={elem.config.elementType} 
                    elementConfig={elem.config.elementConfig}
                    value={elem.config.value} />
                ))}
                

                <Button btnType="Success" clicked={this.orderConfirmHandler}>ORDER</Button>
            </form>
        );

        if (this.state.loading) {
            form = <Spinner/>;
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your Data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;