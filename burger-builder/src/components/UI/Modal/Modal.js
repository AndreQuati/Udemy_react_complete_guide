import React, { Component } from 'react';

import classes from './Modal.module.css'
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

    // Performance improvement: If the modal is not visible it doesn't need to be rendered
    // This method returns a boolen that determines if this component will / not render
    shouldComponentUpdate (nextProps, nextState) {
        // nextProps refers to the prop coming and this.prop to the current prop of this
        // component, before updating. In this case, if show = false (not visible) and 
        // the next coming is true, then this component is rendered as it'll be visible.
        // This logic simply alternates the current state based on the next state, so:
        // If it's not showing and the next state is to show, it renders;
        // If it's showing and next state is to stop showing (e.g.: canceled), it stops rendering;
        // If the state doesn't change but the child content does, it re-renders (loading spinner)
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
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