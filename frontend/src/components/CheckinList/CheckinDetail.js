import { useSelector, useDispatch } from 'react-redux';
// import { Link } from 'react-router-dom';
import './CheckinList.css'
import Comment from '../Comment'

const CheckinDetail = ({ checkin }) => {

    // const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    

    const checkinCreated = new Date(checkin.createdAt);
    const checkinDate = checkinCreated.toDateString();

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
                    <i className="far fa-comments fa-2x"></i>
                </div>
                <div>
                    <Comment />
                </div>
            </div>
        </div>
    )
}

export default CheckinDetail
