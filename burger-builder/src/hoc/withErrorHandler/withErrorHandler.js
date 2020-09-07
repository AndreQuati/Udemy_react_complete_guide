import React, {Component} from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrappedComponent, axios) => {
    // Anonymous class, since it's just evoked on return
    return class extends Component {
        state = {
            error: null
        }

        componentWillMount () {
            // Clears the error state when a new request is sent
            // reqInterceptor property is created here, even it's not declared. Same for resInterceptor
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                // Returning request so it can continue
                return req;
            });
            // If an error is received in a response, sets it to this state
            // res => res - Simply returns the response
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            })
        }

        // Removing the interceptors when this component will stop being rendered to save memory,
        // otherwise new interceptors will keep being created every time and the old ones will continue
        // existing, even thoug they're not useful anymore.
        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        // This clears the error state when the users acknowledges it
        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        // returns the child component with all it's properties
        render () {
            return (
                <Aux>
                    {/* Only shows this modal if state error is not null */}
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {/* Only displays the error if it's not null */}
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHandler;