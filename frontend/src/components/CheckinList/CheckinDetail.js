import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addNewComment } from '../../store/comment';
import Comment from '../Comment'
import './CheckinList.css'

const CheckinDetail = ({ checkin }) => {

    const dispatch = useDispatch();
    const [showCommentInput, setShowCommentInput] = useState(false);
    const [comment, setComment] = useState('');
    const [errors, setErrors] = useState([]);

    const sessionUser = useSelector(state => state.session.user);
    const commentArray = useSelector(state => state.comment.commentArray)
    const filteredComments = commentArray.filter(comment => comment.checkinId === checkin.id)

    const showCommentToggle = () => setShowCommentInput(!showCommentInput)

    const checkinCreated = new Date(checkin.createdAt);
    const checkinDate = checkinCreated.toDateString();

    const addComment = async () => {
        setErrors([]);

        const newComment = {
            userId: sessionUser.id,
            checkinId: checkin.id,
            comment
        }

        const added = await dispatch(addNewComment(newComment))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors);
                    setComment('');
                }
            });

        if (added) {
            setComment('');
            setShowCommentInput(!showCommentInput);
        }
    }

    if (!sessionUser && showCommentInput === true) setShowCommentInput(false);


    return (
        <div className='checkin-detail'>
            <div className='checkin-card'>
                <div className='checkin-detail-info'>
                    <div className='checkin-detail-info-sub'>
                        <i className="fas fa-map-pin fa-2x"></i>
                        <div>
                            <p> {`${checkin.User.username} is drinking a ${checkin.Coffee.name} at ${checkin.location}`}</p>
                            <p className='checkin-date'> {checkinDate}</p>
                        </div>
                    </div>
                    {sessionUser &&
                        <div className='add-comment-button' onClick={showCommentToggle}>
                            <i className="far fa-comment" ></i>
                            <span>Comment</span>
                        </div>
                    }
                </div>
                {showCommentInput &&
                    <div className={`comment-input ${errors.length > 0 ? "error" : ""}`}>
                        <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder={errors.length ? errors[0] : 'Comment'}></textarea>
                        <i className="fas fa-plus fa-2x" onClick={addComment}></i>
                    </div>
                }
                <div className='comment-list'>
                    {filteredComments.map(comment => (
                        <Comment key={comment.id} comment={comment} checkinId={checkin.id} />
                    ))}
                </div>
            </div>
        </div >
    )
}

export default CheckinDetail
