import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
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
            {coffeeArr.map(coffee => (
                <CoffeeDetail key={coffee.id} coffee={coffee}/>
            ))}
        </div>
    )
}

export default CoffeeList
