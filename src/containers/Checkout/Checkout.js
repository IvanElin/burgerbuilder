import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
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
        return(
            <div>
                <CheckoutSummary 
                ingredients={this.props.ings}
                checkoutCanceled={this.checkoutCancelHandler}
                checkoutContinued={this.checkoutCantinueHandler} />

                <Route 
                    path={this.props.match.url + '/contact-data'} 
                    component={ContactData} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients
    }
}

export default connect (mapStateToProps) (Checkout);