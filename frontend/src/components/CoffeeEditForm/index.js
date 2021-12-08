import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { editThisCoffee } from "../../store/coffee";
import './CoffeeEditForm.css'

function CoffeeEditForm() {
    const { id } = useParams();
    const dispatch = useDispatch();

    const [coffeeName, setCoffeeName] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [errors, setErrors] = useState([]);

    const sessionUser = useSelector((state) => state.session.user);
    const coffeeData = useSelector((state) => state.coffee[id])

    useEffect(() => {
        setCoffeeName(coffeeData.name)
        setDescription(coffeeData.description)
        setImageUrl(coffeeData.imageUrl)
    }, [coffeeData.name, coffeeData.description, coffeeData.imageUrl])

    const handleSubmit = (e) => {
        e.preventDefault();

        const revCoffee = {
            coffeeId: id,
            userId: sessionUser.id,
            name: coffeeName,
            description,
            imageUrl
        }
        setErrors([]);
        return dispatch(editThisCoffee(revCoffee))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    };

    if (!sessionUser) return <Redirect to="/" />;

    return (
        <form id='add-coffee-form' onSubmit={handleSubmit}>
            <div>
                <h1 id='add-text'>ADD A NEW HOT CUP OF JOY</h1>
            </div>
            <label>
                Name
                <input
                    type="text"
                    value={coffeeName}
                    onChange={(e) => setCoffeeName(e.target.value)}
                    placeholder='Robusta Skinny'
                    required
                />
            </label>
            <label>
                Description
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder='Froth organic coffee barista skinny sugar carajillo latte. Fair trade whipped cultivar seasonal skinny grounds flavour frappuccino grounds acerbic aftertaste fair trade. Cinnamon cup, french press and dark bar  caffeine. Aged barista java coffee cinnamon lungo et black spoon irish saucer. Latte, spoon, foam trifecta breve coffee carajillo mug con panna arabica.'
                    required
                />
            </label>
            <label>
                Image URL
                <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder='https://cdn.vox-cdn.com/thumbor/9j-s_MPUfWM4bWdZfPqxBxGkvlw=/1400x1050/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/22312759/rickroll_4k.jpg'
                />
            </label>
            <button type="submit">Submit</button>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
        </form>
    );
}

export default CoffeeEditForm;
