import React, {Component} from 'react';

import Modal from '../../components/UI/Modal/Modal';
import ReactAux from '../ReactAux/ReactAux';

const withErrorHandler = ( WrappedContent, axios ) => {
    return class extends Component {

        state = {
            error: null
        }

        componentWillMount() {
            this.reqInterceptors.request.use(request => {
                this.setState({error: null})
                return request;
            })
            this.resInterceptors.response.use(res => res, error => {
                this.setState({error: error})        
            })
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptors);
            axios.interceptors.response.eject(this.resInterceptors);
        }

        errorConfirmedHandler() {
            this.setState({error: null})
            
        }

        render() {
            return(
                <ReactAux>
                    <Modal 
                    show={this.state.error}
                    modalClosed={this.errorConfirmedHandler} >
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedContent {...this.props}/>
                </ReactAux>
            )
        }
    }
}

export default withErrorHandler;