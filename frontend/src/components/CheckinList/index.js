import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
import { getAllCheckins } from '../../store/checkin';
// import CheckinDetail from './CheckinDetail';
import './CheckinList.css'



const CheckinList = () => {
    const dispatch = useDispatch();

    const checkinArr = useSelector(state => {
        return state.checkin.list;
    })

    useEffect(() => {
        dispatch(getAllCheckins())
    }, [dispatch])


    return (
        <div id='checkin-list-container'>
            this is the checkin page
            {/* <Link to='/checkins/new'><i className="far fa-plus-square"><span> ADD A CHECKIN</span></i></Link>
            {checkinArr.map(checkin => (
                <CheckinDetail key={checkin.id} checkin={checkin} />
            ))} */}
        </div>
    )
}

export default CheckinList
