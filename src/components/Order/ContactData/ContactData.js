import React, { Component } from 'react';
import classes from './ContactData.module.css';

import Button from '../../UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../UI/Spinner/Spinner'

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        adress: {
            street: '',
            postalCode: ''
        },

        loading: false
    }

    orderConfirmHandler = (event) => {
        event.preventDefault();
        
        this.setState({ loading: true });
        const order = {
            ingridients: this.props.ingredients,
            // price: this.props.totalPrice,
            customer: {
                name: 'Ivan',
                address: {
                    city: 'Lviv',
                    street: 'testStreet',
                    country: 'Ukraine'
                },
                email: 'test@test.com',
                deliveryMethod: 'default' 
            }
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
        let form = (
            <form>
                <input type="text" name="name" placeholder="Your Name"/>
                <input type="email" name="email" placeholder="Your Email"/>
                <input type="text" name="street" placeholder="Your Street"/>
                <input type="text" name="postal" placeholder="Postal Code"/>

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