import React, { Component } from 'react';
import classes from './ContactData.module.css';

import Button from '../../UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../UI/Spinner/Spinner';
import Input from '../../UI/Input/Input';
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { updateObject } from '../../../shared/utility';
import { checkValidity } from '../../../shared/validation';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },

            city: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'City'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'default', displayValue: 'Default'},
                        {value: 'fastest', displayValue: 'Fastest'}
                    ]
                },
                value: 'default',
                validation: {},
                valid: true
            } 
        
        },
        formIsValid: false
    }

    orderConfirmHandler = (event) => {
        event.preventDefault();
        
        const formData = {};
        for ( let key in this.state.orderForm) {
            formData[key] = this.state.orderForm[key].value
        }

        const order = {
            ingridients: this.props.ings,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId
        }

        this.props.onOrderBurger(order, this.props.token);
    }
    
    inputChangedHandler = (event, inputId) => {

        const updatedFormElement = updateObject(this.state.orderForm[inputId], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.orderForm[inputId].validation),
            touched: true
        });

        const updatedForm = updateObject(this.state.orderForm, {
            [inputId]: updatedFormElement
        })

        let formIsValid = true;

        for ( let inputIdentifier in updatedForm ) {
            formIsValid = updatedForm[inputIdentifier].valid && formIsValid; 
        }

        this.setState({ orderForm: updatedForm, formIsValid: formIsValid });
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
            <form onSubmit={this.orderConfirmHandler}>
                {formElementArray.map(elem => (
                    <Input 
                    key={elem.id}
                    elementType={elem.config.elementType} 
                    elementConfig={elem.config.elementConfig}
                    value={elem.config.value} 
                    changed={(event) => this.inputChangedHandler(event, elem.id)}
                    invalid={!elem.config.valid}
                    shouldValidate={elem.config.validation}
                    touched={elem.config.touched} />
                ))}
                
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );

        if (this.props.loading) {
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

const mapStateToProps = state => {
    return {
        ings: state.burger.ingredients,
        price: state.burger.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.puchaseBurger(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));