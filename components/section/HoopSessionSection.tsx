import React, {Component} from 'react';
import {HoopSessionHeader} from '../header/HoopSessionHeader';
import {MemberList} from '../list/MemberList';

type MyProps = {
    // @ts-ignore
    hoopSession: HoopSession
};
type MyState = {
    showMembersModal: boolean;
};

export class HoopSessionSection extends Component<MyProps, MyState>{
    constructor(props: MyProps) {
        super(props);
        this.state = {
            showMembersModal: false
        }
    }

    render() {
        return (
            <section className="md:py-16 md:my-0 bg-accent">
                <div className="container mx-auto">
                    <HoopSessionHeader hoopSession={this.props.hoopSession}/>
                    <img className="w-full h-auto rounded-md mt-2 bg-cover" src={this.props.hoopSession.hoopspot?.image}
                         alt="image"/>


                    <div className="w-3/5">
                        <div className="flex justify-between my-4">
                            <h2 className="flex text-lg font-semibold tracking-wide">Attendees ({this.props.hoopSession.members?.length})</h2>
                            <button className="flex underline focus:outline-none">See all</button>
                        </div>

                        {/*@ts-ignore*/}
                        <MemberList members={this.props.hoopSession.members}/>
                    </div>
                </div>
            </section>
        );
    }
}
