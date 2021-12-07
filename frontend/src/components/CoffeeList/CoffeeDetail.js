import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
// import { getAllCoffees } from '../../store/coffee';
import './CoffeeList.css'


const CoffeeDetail = ({coffee}) => {
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(getAllCoffees())
    // }, [dispatch])

    // const coffee = useSelector(state => {
    //     return state.coffee.list;
    // })

    console.log(coffee)


    return (
        <div>
            <p>{coffee.name}</p>
            <p>{coffee.description}</p>
        </div>
    )
}

export default CoffeeDetail
