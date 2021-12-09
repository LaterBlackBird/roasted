import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
import { deleteThisComment } from '../../store/comment';

const Comment = ({comment}) => {

    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const deleteComment = async () => {
        dispatch(deleteThisComment(comment.id))
    }


    let userOptions;
    if (sessionUser && sessionUser.username === comment.User.username) {
        userOptions = (
            <div>
                {/* <Link ><i className="far fa-edit"> <span> Edit</span></i></Link> */}
                <i className="far fa-trash-alt" onClick={deleteComment}> <span> Delete</span></i>
            </div>
        )
    }

    return (
        <div>
            <i className="far fa-user"></i>
            <p>{comment.User.username}:</p>
            <p>{comment.comment}</p>
            {userOptions}
        </div>
    )
}

export default Comment
