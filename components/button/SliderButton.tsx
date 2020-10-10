import {Component} from 'react';

type MyProps = {
    onClick(event: React.MouseEvent<HTMLButtonElement>): void;
};
type MyState = {

};

export class SliderButton extends Component<MyProps, MyState>{
    render() {
        return (
            <button
                onClick={this.props.onClick}
                className="px-1 py-1 font-bold bg-primary text-gray-100 focus:shadow-outline-orange focus:outline-none transition duration-300 mt-4 sm:mt-0 first:ml-0 ml-6 rounded-full">
                {this.props.children}
            </button>
        );
    }
}
