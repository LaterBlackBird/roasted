import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteThisComment, editThisComment } from '../../store/comment';
import './Comment.css';


const Comment = ({ comment, checkinId }) => {

    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [showEditField, setShowEditField] = useState(false);
    const [editedComment, setEditedComment] = useState(comment.comment);
    const [elapsedTime, setElapsedTime] = useState('')
    const [errors, setErrors] = useState([]);

    const showEditToggle = () => {
        setShowEditField(!showEditField)
    }

    useEffect(() => {
        const commentCreated = new Date(comment.createdAt);
        const diff = Number(new Date()) - commentCreated;
        const minute = 60 * 1000;
        const hour = minute * 60;
        const day = hour * 24;
        const month = day * 30;
        const year = day * 365;
        switch (true) {
            case diff < minute:
                const seconds = Math.round(diff / 1000);
                return setElapsedTime(`${seconds} ${seconds > 1 ? 'seconds' : 'second'} ago`);
            case diff < hour:
                return setElapsedTime(Math.round(diff / minute) + ' minutes ago');
            case diff < day:
                return setElapsedTime(Math.round(diff / hour) + ' hours ago');
            case diff < month:
                return setElapsedTime(Math.round(diff / day) + ' days ago');
            case diff < year:
                return setElapsedTime(Math.round(diff / month) + ' months ago');
            case diff > year:
                return setElapsedTime(Math.round(diff / year) + ' years ago');
            default:
                return "";
        };
    }, [comment.createdAt])


    const editComment = async () => {
        setErrors([]);

        const editedCommentObj = {
            commentId: comment.id,
            userId: sessionUser.id,
            checkinId,
            comment: editedComment
        }

        const edited = await dispatch(editThisComment(editedCommentObj))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });

        if (edited) {
            setShowEditField(!showEditField);
        }
    }


    const deleteComment = async () => {
        dispatch(deleteThisComment(comment.id))
    }


    let userOptions;
    if (sessionUser && sessionUser.username === comment.User.username) {
        userOptions = (
            <div>
                {!showEditField && <i className="far fa-edit" onClick={showEditToggle}> <span> Edit</span></i>}
                <i className="far fa-trash-alt" onClick={deleteComment}> <span> Delete</span></i>
            </div>
        )
    }

    return (
        <div className='comment-container'>
            <i className="far fa-user"></i>
            <div className='commentView-commentInfo'>
                <div className='commentView-commentInfo-header'>
                    <span className='commentView-username'>{comment.User.username}:</span>
                    <span className='commentView-elapsedTime'>{elapsedTime}</span>
                </div>
                {showEditField &&
                    <div className='commentView-editComment' >
                        <textarea value={editedComment} onChange={(e) => setEditedComment(e.target.value)} placeholder={errors.length ? errors[0] : 'Comment'}></textarea>
                        <div className='commentView-editCommentOptions'>
                            <i className="fas fa-check commentView-editCommentConfirm" onClick={editComment}><span> Submit</span></i>
                            <i className="fas fa-ban commentView-editCommentCancel" onClick={() => setShowEditField(!showEditField)}><span> Cancel</span></i>
                        </div>
                    </div>
                }
                {!showEditField && <p className='commentView-comment' >{comment.comment}</p>}
                {userOptions}
            </div>
        </div>
    )
}

export default Comment
