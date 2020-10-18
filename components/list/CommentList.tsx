import React, {FunctionComponent, useContext, useState} from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {RestService} from '../../services/RestService';
import {ResponseFactory} from '../../interfaces/ResponseFactory';
import UserContext from '../context/UserContext';

type CommentListProps = {
    hoopSpot: HoopSpot;
}

dayjs.extend(relativeTime);

const CommentList: FunctionComponent<CommentListProps> = (props: CommentListProps) => {
    const { user } = useContext(UserContext);
    const [userComment, setUserComment] = useState<string>('');
    const [comments, setComments] = useState<Commentable[] | undefined>(props.hoopSpot.comments);

    const commentSubmitHandler = (event: any) => {
        event.preventDefault();

        const restService: RestService = new RestService();

        restService.makeHttpRequest(`hoopspot/${props.hoopSpot.slug}/comment`, `POST`, {comment: userComment})
            .then(async (res: ResponseFactory<Commentable>) => {
                // Get our current comments
                let tempComments: Commentable[] | undefined = comments;
                // This is the comment sent back from the API response.
                let comment: Commentable = res.data;
                // We will now add the comment from the API response to our temp state comments.
                tempComments?.push(comment);

                setComments(comments);
                setUserComment('');
            });
    };

    const getCommentForm = () => {
        return (
            <form onSubmit={commentSubmitHandler}>
                <h1 className="text-gray-700 font-semibold text-lg flex items-center">
                    <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20"
                         xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd"
                              d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                              clipRule="evenodd"/>
                    </svg>
                    Add a new comment
                </h1>
                <textarea rows={3} className="bg-accent w-full mt-5 rounded border-2 focus:outline-none"
                          value={userComment}
                          onChange={event => setUserComment(event.target.value)}/>
                <div className="mt-2 flex justify-between">
                    <div className="hidden md:flex items-center">
                        <p className="text-xs ml-2 text-gray-500">Share a to message all members.</p>
                    </div>
                    <button
                        type="submit"
                        className="w-full md:w-auto px-4 py-2 bg-primary rounded-lg text-white font-semibold focus:shadow-outline focus:outline-none">
                        Post Comment
                    </button>
                </div>
            </form>
        )
    }

    return (
        <div className="w-full bg-white rounded-lg p-5 shadow-lg">
            <ul className="space-y-5 pb-5">
                {
                    comments?.map(comment => (
                        <li className="flex py-1" key={`comment-${comment.id}`}>
                            <div className="flex-shrink-0 mr-5">
                                <img className="inline-block h-10 w-10 rounded-full shadow-md"
                                     src={comment.commented.avatar} alt={comment.commented.name}/>
                            </div>
                            <div>
                                <h1 className="font-semibold text-gray-800 pb-2">
                                    {comment.commented.name} <span
                                    className="text-gray-500 font-medium">• {dayjs(comment.created_at).fromNow()}</span>
                                </h1>
                                <p className="text-gray-600">
                                    {comment.comment}
                                </p>
                            </div>
                        </li>
                    ))
                }
            </ul>
            {
                user != null ? getCommentForm() : (
                    <div className="mt-2 flex justify-between">
                        <div className="flex items-center">
                            <a href="/login" className="text-sm ml-2 text-gray-500"> Login to post a message</a>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default CommentList;
