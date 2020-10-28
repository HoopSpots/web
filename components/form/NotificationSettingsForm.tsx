import React, {FunctionComponent, useContext, useState} from 'react';
import {RestService} from '../../services/RestService';
import UserContext from '../context/UserContext';
import {Notyf} from 'notyf';
import {ResponseFactory} from '../../interfaces/ResponseFactory';

type NotificationSettingsFormProps = {
    user: User | null;
}

const NotificationSettingsForm: FunctionComponent<NotificationSettingsFormProps> = (props) => {
    const restService = new RestService();
    const {updateUser} = useContext(UserContext);
    const [notifyFollowerActivity, setNotifyFollowerActivity] = useState<boolean>(props.user?.notify_follower_activity || false);
    const [notifyRecommendations, setNotifyRecommendations] = useState<boolean>(props.user?.notify_recommendations || false);
    const [notifyHoopSessions, setNotifyHoopSessions] = useState<boolean>(props.user?.notify_hoop_sessions || false);
    const [notifyComments, setNotifyComments] = useState<boolean>(props.user?.notify_comments || false);

    const updateNotificationSettingsHandler = (event: any) => {
        const notyf = new Notyf();
        event.preventDefault();
        const body = {
            notify_follower_activity: notifyFollowerActivity,
            notify_recommendations: notifyRecommendations,
            notify_comments: notifyComments,
            notify_hoop_sessions: notifyHoopSessions
        };

        restService.makeHttpRequest(`account`, `PATCH`, body).then((res: ResponseFactory<User>) => {
            notyf.success(res.message);
            if (updateUser) {
                updateUser(res.data);
            }
        }).catch(err => {
            console.log(err);
            notyf.error(err.response.data.message);
        });
    };

    return (
        <div className="mt-10 sm:mt-0">
            <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                    <div className="px-4 sm:px-0">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Notification Settings</h3>
                        <p className="mt-1 text-sm leading-5 text-gray-600">
                            Decide which communications you'd like to receive.
                        </p>
                    </div>
                </div>
                <div className="mt-5 md:mt-0 md:col-span-2">
                    <form onSubmit={updateNotificationSettingsHandler}>
                        <div className="shadow overflow-hidden sm:rounded-md">
                            <div className="px-4 py-5 bg-white sm:p-6">
                                <fieldset>
                                    <legend className="text-base leading-6 font-medium text-gray-900">Notifications</legend>
                                    <div className="mt-4">
                                        <div className="flex items-start">
                                            <div className="flex items-center h-5">
                                                <input id="comments"
                                                       type="checkbox"
                                                       onChange={e => setNotifyComments(e.target.checked)}
                                                       checked={notifyComments}
                                                       className="form-checkbox h-4 w-4 text-primary focus:shadow-outline-orange focus:outline-none transition duration-150 ease-in-out" />
                                            </div>
                                            <div className="ml-3 text-sm leading-5">
                                                <label htmlFor="comments" className="font-medium text-gray-700">Comments</label>
                                                <p className="text-gray-500">Get notified when someones posts a comment in a Hoop Spot or Hoop Session.</p>
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <div className="flex items-start">
                                                <div className="flex items-center h-5">
                                                    <input id="hoop_sessions" onChange={e => setNotifyHoopSessions(e.target.checked)} checked={notifyHoopSessions} type="checkbox" className="form-checkbox h-4 w-4 text-primary focus:shadow-outline-orange focus:outline-none transition duration-150 ease-in-out" />
                                                </div>
                                                <div className="ml-3 text-sm leading-5">
                                                    <label htmlFor="hoop_sessions" className="font-medium text-gray-700">Hoop Sessions</label>
                                                    <p className="text-gray-500">Get notified when a Hoop Session is starting soon.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <div className="flex items-start">
                                                <div className="flex items-center h-5">
                                                    <input id="recommendations" onChange={e => setNotifyRecommendations(e.target.checked)} checked={notifyRecommendations} type="checkbox" className="form-checkbox h-4 w-4 text-primary focus:shadow-outline-orange focus:outline-none transition duration-150 ease-in-out" />
                                                </div>
                                                <div className="ml-3 text-sm leading-5">
                                                    <label htmlFor="recommendations" className="font-medium text-gray-700">Recommendations</label>
                                                    <p className="text-gray-500">Get notified when a Hoop Spots recommends you should follow something you'd like.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <div className="flex items-start">
                                                <div className="flex items-center h-5">
                                                    <input id="followers" onChange={e => setNotifyFollowerActivity(e.target.checked)} checked={notifyFollowerActivity} type="checkbox" className="form-checkbox h-4 w-4 text-primary focus:shadow-outline-orange focus:outline-none transition duration-150 ease-in-out" />
                                                </div>
                                                <div className="ml-3 text-sm leading-5">
                                                    <label htmlFor="followers" className="font-medium text-gray-700">Follower Activity</label>
                                                    <p className="text-gray-500">Get notified when a person your following performs an action.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                <button type="submit"
                                        className="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-primary focus:outline-none focus:shadow-outline-orange transition duration-150 ease-in-out">
                                    Save
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default NotificationSettingsForm;
