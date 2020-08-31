import React, { Component } from 'react';

import classes from './Modal.module.css'
import Aux from '../../../hoc/Aux';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

    // Performance improvement: If the modal is not visible it doesn't need to be rendered
    // This method checks returns a boolen that determines if this component will / not render
    shouldComponentUpdate (nextProps, nextState) {
        // nextProps refers to the prop coming and this.prop to the current prop of this
        // component, before updating. In this case, if show = false (not visible) and 
        // the next coming is true, then this component is rendered as it'll be visible.
        return nextProps.show !== this.props.show;
    }

    // Just for debuging
    // componentWillUpdate () {
    //     console.log("[Modal] will update");
    // }

    render() {
        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </Aux>
        );
    }
}

export default Modal;