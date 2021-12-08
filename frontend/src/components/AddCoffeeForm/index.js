import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { addNewCoffee } from "../../store/coffee";
import './AddCoffeeForm.css'

function AddCoffeeForm() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [coffeeName, setCoffeeName] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [errors, setErrors] = useState([]);

    if (!sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();

        const newCoffee = {
            userId: sessionUser.id,
            name: coffeeName,
            description,
            imageUrl
        }

        setErrors([]);
        return dispatch(addNewCoffee(newCoffee))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });

    };


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

export default AddCoffeeForm;
