import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { addNewCoffee, getAllCoffees } from "../../store/coffee";
import './AddCheckinForm.css'

function AddCheckinForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    const coffeeList = useSelector((state) => state.coffee.list)
    const [coffeeName, setCoffeeName] = useState("");
    const [establishment, setEstablishment] = useState("");
    const [city, setCity] = useState("");
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        dispatch(getAllCoffees())
    }, [dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        const location = `${establishment} in ${city}`
        const coffeeItem = coffeeList.find(coffee => coffee.name === coffeeName)


        const newCheckin = {
            userId: sessionUser.id,
            drinkId: coffeeItem.id,
            location
        }

        // const added = await dispatch(addNewCoffee(newCheckin))
        //     .catch(async (res) => {
        //         const data = await res.json();
        //         if (data && data.errors) setErrors(data.errors);
        //     });

        // if (added) history.push('/coffees')

    };

    const returnToList = () => {
        history.push('/checkins')
    }

    if (!sessionUser) return <Redirect to="/" />;

    return (
        <form id='add-checkin-form' onSubmit={handleSubmit}>
            <div id='add-checkin-marquee'>
                <h1 id='add-text'>LET EVERYONE KNOW WHERE YOU ARE</h1>
                <h2>AND WHAT YOU'RE DOING</h2>
                <h6>IT'S NOT WEIRD</h6>
            </div>
            <label>
                What are you drinking?
                <select
                    value={coffeeName}
                    onChange={(e) => setCoffeeName(e.target.value)}
                    placeholder='Robusta Skinny'
                    required
                >
                    <option selected>Please Select One</option>
                    {coffeeList.map(coffee => {
                        return <option key={coffee.id} value={coffee.name}>{coffee.name}</option>
                    })}
                </select>
            </label>
            <label>
                Name of the establishment?
                <input
                    type="text"
                    value={establishment}
                    onChange={(e) => setEstablishment(e.target.value)}
                    placeholder='Wake Up Cafe'
                    required
                />
            </label>
            <label>
                In what the city?
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder='Liquid Gold'
                />
            </label>
            <div className='add-buttons'>
                <button type="submit">Submit</button>
                <button onClick={returnToList}>Cancel</button>
            </div>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
        </form >
    );
}

export default AddCheckinForm;
