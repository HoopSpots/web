import React, {Component} from 'react';

type MyProps = {
    members: User[];
};
type MyState = {};

export class MemberList extends Component<MyProps, MyState>{
    render() {
        return (
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4 mt-5">
                {this.props.members.map(member => (
                    <li key={member.uuid} className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow">
                        <div className="flex-1 flex flex-col p-8">
                            <img className="w-24 h-24 flex-shrink-0 mx-auto bg-black rounded-full"
                                 src={member.avatar}
                                 alt={`${member.name} avatar`}/>
                            <h3 className="mt-6 text-gray-900 text-sm leading-5 font-medium">{member.name}</h3>
                        </div>
                    </li>
                ))}
            </ul>
        );
    }
}
