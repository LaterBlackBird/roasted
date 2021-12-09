import { useSelector, useDispatch } from 'react-redux';
const Comment = () => {

    const sessionUser = useSelector(state => state.session.user);

    return (
        <div>
            comment
        </div>
    )
}

export default Comment
