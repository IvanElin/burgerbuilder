import React from 'react';

import classes from './Logo.module.css';

const logo = (props) => (
    <a href='/' className={[classes.Logo, classes[props.logoType]].join(' ')}>
        Burger Builder
    </a>
);

export default logo;