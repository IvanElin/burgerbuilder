import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route, Redirect} from 'react-router-dom';
import ContactData from '../../components/Order/ContactData/ContactData';
import { connect } from 'react-redux';

class Checkout extends Component {
    
    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }

    checkoutCantinueHandler = () => {
        this.props.history.replace('checkout/contact-data');
    }

    render() {
        let summary = <Redirect to='/' />
        if (this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to='/' /> : null;
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary 
                        ingredients={this.props.ings}
                        checkoutCanceled={this.checkoutCancelHandler}
                        checkoutContinued={this.checkoutCantinueHandler} />
                    <Route 
                        path={this.props.match.url + '/contact-data'} 
                        component={ContactData} />
                </div>
                )
        };

        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burger.ingredients,
        purchased: state.order.purchased
    }
}


export default connect (mapStateToProps) (Checkout);