import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteThisComment, editThisComment } from '../../store/comment';
import './Comment.css';


const Comment = ({ comment, checkinId }) => {

    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [showEditField, setShowEditField] = useState(false);
    const [editedComment, setEditedComment] = useState(comment.comment);
    const [errors, setErrors] = useState([]);

    const showEditToggle = () => {
        setShowEditField(!showEditField)
    }

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
                <p className='commentView-username'>{comment.User.username}:</p>
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
