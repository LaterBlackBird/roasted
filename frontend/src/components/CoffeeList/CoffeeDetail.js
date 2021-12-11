import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteThisCoffee } from '../../store/coffee';

import './CoffeeList.css'


const CoffeeDetail = ({ coffee }) => {

    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const deleteCoffee = () => {
        dispatch(deleteThisCoffee(coffee.id))
    }

    let userOptions;
    if (sessionUser && sessionUser.username === coffee.User.username) {
        userOptions = (
            <div>
                <Link to={`/coffees/${coffee.id}`}><i className="far fa-edit"> <span> Edit</span></i></Link>
                <i className="far fa-trash-alt" onClick={deleteCoffee}> <span> Delete</span></i>
            </div>
        )
    }

    return (
        <div className='coffee-detail'>
            <div className='coffee-detail-info'>
                <img className='coffee-img' src={coffee.imageUrl ? coffee.imageUrl : "https://res.cloudinary.com/dd1ndszow/image/upload/v1638898746/Roasted/Coffee-Default_to4zq1.png"} alt="default coffee cup" />
                <div className='coffee-detail-text'>
                    <span className='coffee-detail-name'>{coffee.name}</span>
                    <span className='coffee-detail-description'>{coffee.description}</span>
                    <span className='coffee-detail-user'>Created by {coffee.User.username}</span>
                </div>
            </div>
            <div className='user-options-container'>
                {userOptions}
            </div>
        </div>
    )
}

export default CoffeeDetail
