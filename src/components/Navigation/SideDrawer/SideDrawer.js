import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import ReactAux from '../../../hoc/ReactAux/ReactAux';

const sideDrawer = ( props ) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        <ReactAux>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <Logo logoType='Sidebar'/>
                <nav>
                    <NavigationItems isAuth={props.isAuth} />
                </nav>
            </div>
        </ReactAux>
    );
};

export default sideDrawer;