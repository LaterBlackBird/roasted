import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
const Comment = ({comment}) => {

    const sessionUser = useSelector(state => state.session.user);

    let userOptions;
    if (sessionUser && sessionUser.username === comment.User.username) {
        userOptions = (
            <div>
                <Link ><i className="far fa-edit"> <span> Edit</span></i></Link>
                <i className="far fa-trash-alt" > <span> Delete</span></i>
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
