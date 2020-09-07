import React, { Component } from 'react';

// This hoc allows wrapped components to be loaded whenever requested, instead of downloading
// it with the rest of the application when first accessed. 
const asyncComponent = (importComponent) => {
    return class extends Component {
        state = {
            component: null
        }

        componentDidMount () {
            importComponent()
                .then(comp => {
                    this.setState({component: comp.default});
                });
        }

        render () {
            const C = this.state.component;
            return C ? <C {...this.props} /> : null;
        }
    }
} 

export default asyncComponent;