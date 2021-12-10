import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteThisComment, editThisComment } from '../../store/comment';


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
        <div>
            <i className="far fa-user"></i>
            <p>{comment.User.username}:</p>
            {showEditField &&
                <div>
                    <textarea value={editedComment} onChange={(e) => setEditedComment(e.target.value)} placeholder={errors.length ? errors[0] : 'Comment'}></textarea>
                    <i className="fas fa-check" onClick={editComment}></i>
                    <i className="fas fa-ban" onClick={() => setShowEditField(!showEditField)}></i>
                </div>
            }
            {!showEditField && <p>{comment.comment}</p>}
            {userOptions}
        </div>
    )
}

export default Comment
