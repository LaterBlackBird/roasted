// import { useSelector, useDispatch } from 'react-redux';
// import { Link } from 'react-router-dom';
import './CheckinList.css'


const CheckinDetail = ({ checkin }) => {

    // const sessionUser = useSelector(state => state.session.user);
    // const dispatch = useDispatch();

    const checkinCreated = new Date(checkin.createdAt);
    const checkinDate = checkinCreated.toDateString();

    return (
        <div className='checkin-detail'>
            <div className='checkin-detail-info'>
                <div>
                    <i className="fas fa-map-pin"></i>
                </div>
                <div>
                    <p> {`${checkin.User.username} is drinking a ${checkin.Coffee.name} at ${checkin.location}`}</p>
                    <p className='checkin-date'> {checkinDate}</p>
                </div>
            </div>
        </div>
    )
}

export default CheckinDetail
