import React from 'react';
import classes from './Spinner.module.css';

const spinner = () => (
    // The "loading..." message is just a fallback in case the CSS spinner doesn't load
    <div className={classes.Loader}>Loading...</div>
);

export default spinner;