import { useSelector } from 'react-redux';
import './CoffeeList.css'


const CoffeeDetail = ({ coffee }) => {

    const sessionUser = useSelector(state => state.session.user);

    let userOptions;
    if (sessionUser && sessionUser.username === coffee.User.username) {
        userOptions = (
            <div>
                <i class="far fa-edit"> <span> Edit</span></i>
                <i class="far fa-trash-alt"> <span> Delete</span></i>
            </div>
        )
    }

    return (
        <div className='coffee-detail'>
            <div className='coffee-detail-info'>
                <img className='coffee-img' src="https://res.cloudinary.com/dd1ndszow/image/upload/v1638898746/Coffee-Default_to4zq1.png" alt="default coffee cup" />
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
