import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem Link="/" active>Burger Builder</NavigationItem>
        <NavigationItem Link="/">Checkout</NavigationItem>
    </ul>
);

export default NavigationItems;