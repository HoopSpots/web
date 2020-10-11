import {Component} from 'react';

type MyProps = {

};
type MyState = {};

export class SectionHeading extends Component<MyProps, MyState>{
    render() {
        return (
            <h2 className="text-4xl sm:text-5xl font-black tracking-wide">
                {this.props.children}
            </h2>
        );
    }
}
