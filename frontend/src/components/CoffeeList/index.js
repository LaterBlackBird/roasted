import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllCoffees } from '../../store/coffee';
import CoffeeDetail from './CoffeeDetail';
import './CoffeeList.css'



const CoffeeList = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCoffees())
    }, [dispatch])

    const coffeeArr = useSelector(state => {
        return state.coffee.list;
    })

    return (
        <div id='coffee-list-container'>
            <Link to='/coffees/new'><i class="far fa-plus-square"><span> ADD A COFFEE</span></i></Link>
            {coffeeArr.map(coffee => (
                <CoffeeDetail key={coffee.id} coffee={coffee} />
            ))}
        </div>
    )
}

export default CoffeeList
