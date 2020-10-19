import React, {Component} from 'react';
import {Footer} from '../footer/Footer';
import NavHeader from '../header/NavHeader';

export class Layout extends Component{
    render() {
        return (
            <div>
                <NavHeader/>
                {this.props.children}
                <Footer/>
            </div>
        );
    }
}
