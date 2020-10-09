import React, {Component} from 'react'

type MyProps = {
    type: string;
    to: string;
    text: string;
};
type MyState = {

};

export class HeaderButton extends Component<MyProps, MyState> {
    render() {
        let style = 'inline-flex items-center justify-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-primary focus:outline-none focus:shadow-outline-orange transition ease-in-out duration-150';
        if (this.props.type.toLowerCase() ===  'secondary') {
            style = 'text-base leading-6 font-medium text-gray-500 text-primary focus:outline-none transition ease-in-out duration-150'
        }

        return (
            <div>
                <a href={this.props.to}
                   className={style}>
                    {this.props.text}
                </a>
            </div>
        )
    }
}
