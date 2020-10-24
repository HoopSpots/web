import React, {FunctionComponent} from 'react';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import {MemberListTypeEnum} from '../../interfaces/enums/MemberListTypeEnum';

type FullMemberListProps = {
    members: User[] | null | undefined;
    listType: MemberListTypeEnum.hoopsessions | MemberListTypeEnum.hoopspots;
}

dayjs.extend(localizedFormat);

const FullMemberList: FunctionComponent<FullMemberListProps> = (props) => {
    return (
        <ul className="space-y-2 mt-3 divide-y pt-1">
            {
                props.members?.map(member => (
                    <li className="flex items-center justify-between py-2" key={member.name}>
                        <div className="flex">
                            <img className="w-8 h-8 md:w-10 md:h-10 rounded-full"
                                 src={member.avatar} alt={member.uuid}/>
                            <h3 className="text-md md:text-lg leading-10 font-medium ml-2 text-gray-800">
                                {member.name}
                            </h3>
                        </div>
                        {
                            props.listType === MemberListTypeEnum.hoopsessions ?
                                (<p className="text-gray-500 text-xs md:text-sm">{dayjs(member.pivot.responded_at).format('lll')}</p>):
                                (<p className="text-gray-500 text-xs md:text-sm">{dayjs(member.pivot.joined_on).format('lll')}</p>)
                        }
                    </li>
                ))
            }
        </ul>
    );
};

export default FullMemberList;
