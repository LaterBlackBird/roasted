import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllCoffees } from '../../store/coffee';
import CoffeeDetail from './CoffeeDetail';
import './CoffeeList.css'



const CoffeeList = () => {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const coffeeArr = useSelector(state => {
        return state.coffee.list;
    })

    useEffect(() => {
        dispatch(getAllCoffees())
    }, [dispatch])


    return (
        <div id='coffee-list-container'>
            {sessionUser && <Link className='add-action' to='/coffees/new'><i className="far fa-plus-square"><span> ADD A COFFEE</span></i></Link>}
            {coffeeArr.map(coffee => (
                <CoffeeDetail key={coffee.id} coffee={coffee} />
            ))}
        </div>
    )
}

export default CoffeeList
