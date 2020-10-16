import React, {Component} from 'react';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

type FullMemberListProps = {
    members: User[] | null | undefined
}

dayjs.extend(localizedFormat);


export class FullMemberList extends Component<FullMemberListProps> {
    constructor(props: FullMemberListProps) {
        super(props);
    }

    render() {
        return (
            <ul className="space-y-2 mt-3 divide-y pt-1">
                {
                    this.props.members?.map(member => (
                        <li className="flex items-center justify-between py-2" key={member.name}>
                            <div className="flex">
                                <img className="w-10 h-10 rounded-full"
                                     src={member.avatar} alt={member.uuid}/>
                                <h3 className="text-lg leading-10 font-medium ml-2 text-gray-800">
                                    {member.name}
                                </h3>
                            </div>
                            <p className="text-gray-500 text-sm">{dayjs(member.pivot.joined_on).format('lll')}</p>
                        </li>
                    ))
                }
            </ul>
        );
    }
}
