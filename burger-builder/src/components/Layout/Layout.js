import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import classes from './Layout.module.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    
    state = {
        showSideDrawer: true
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }

    sideDrawerToggleHandler = () => {
        // Should never update state using itself in a statement like
        // {showSideDrawer: this.state.showSideDrawer} due to async nature of state.
        // Instead, use approach below using a function returning new state
        this.setState((prevState) => {
           return { showSideDrawer: !prevState.showSideDrawer }
        });
    }

    render() {
        return (
            <Aux>
                <Toolbar drawerToggledClicked={this.sideDrawerToggleHandler} />
                <SideDrawer 
                    open={this.state.showSideDrawer} 
                    closed={this.sideDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout;