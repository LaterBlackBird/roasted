import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './CheckinList.css'
import Comment from '../Comment'

const CheckinDetail = ({ checkin }) => {

    const dispatch = useDispatch();
    const [showCommentInput, setShowCommentInput] = useState(false);
    const [newComment, setNewComment] = useState('');
    const sessionUser = useSelector(state => state.session.user);
    const commentArray = useSelector(state => state.comment.commentArray)
    const filteredComments = commentArray.filter(comment => comment.checkinId === checkin.id)

    const showCommentToggle = () => setShowCommentInput(!showCommentInput)

    const checkinCreated = new Date(checkin.createdAt);
    const checkinDate = checkinCreated.toDateString();

    const addComment = () => {
        console.log('add ', newComment)
    }

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
                    <div onClick={showCommentToggle}>
                        <i className="far fa-comments fa-2x" ></i>
                    </div>
                </div>
                {showCommentInput &&
                    <div>
                        <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} cols="30" rows="10"></textarea>
                        <i className="fas fa-plus" onClick={addComment}></i>
                    </div>
                }
                <div>
                    {filteredComments.map(comment => (
                        <Comment key={comment.id} comment={comment} />
                    ))}
                </div>
            </div>
        </div >
    )
}

export default CheckinDetail
