import React, {Component} from 'react';
import {Header} from '../header/Header.';
import {Footer} from '../footer/Footer';
import {RestService} from '../../services/RestService';

type LayoutProps = {

};
type LayoutState = {
    isLoggedIn: boolean;
};

export class Layout extends Component<LayoutProps, LayoutState>{
    constructor(props: LayoutProps) {
        super(props);
        this.state = {
            isLoggedIn: false
        }
    }

    componentDidMount(): void {
        const restService: RestService = new RestService();
        restService.isLoggedIn().then(res => {
            this.setState({isLoggedIn: res});
        });
    }

    render() {
        return (
            <div>
                <Header isLoggedIn={this.state.isLoggedIn}/>
                {this.props.children}
                <Footer/>
            </div>
        );
    }
}
