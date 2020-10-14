import {Component} from 'react';

type MyProps = {
    members: User[]
};
type MyState = {};

export class MembersModal extends Component<MyProps, MyState> {
    constructor(props: MyProps) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

                    <div className="fixed inset-0 transition-opacity">
                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>

                    <div
                        className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6"
                        role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                        <h1 className="font-semibold text-center text-4xl leading-10 mb-5">Attending Members</h1>
                        <ul className="rounded-lg space-y-2 shadow-md">
                            {
                                this.props.members.map(member => (
                                    <li className="flex items-center justify-between px-4 py-2 rounded-t-lg">
                                        <div className="flex">
                                            <img className="w-12 h-12 rounded-full"
                                                 src={member.avatar}/>
                                            <h3 className="text-xl leading-10 font-normal ml-2 text-gray-800">{member.name}</h3>
                                        </div>
                                        <p className="text-gray-500 text-sm">5 hours ago</p>
                                    </li>
                                ))
                            }
                        </ul>

                    </div>
                </div>
            </div>
        );
    }
}
