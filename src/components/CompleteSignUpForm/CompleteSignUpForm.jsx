import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { completeSignUp, getCountry } from "../../redux/actions";


const CompleteSignUpForm = () =>
{

    const dispatch = useDispatch();
    const { countries, loggedUser } = useSelector(state => state.user);


    useEffect(() => 
    {
        dispatch(getCountry());
    }, []);

    const [input, setInput] = useState({

        phoneNumber: "",
        country: "",
        city: ""
    });
    const [error, setError] = useState({

        phoneNumber: "",
        country: "",
        city: ""
    });

    function handleInputChange(e)
    {
        const nameInput = e.target.name;
        const valueInput = e.target.value;
        switch (nameInput)
        {
            case 'phoneNumber':
                if (valueInput === '')
                    setError({
                        ...error,
                        phoneNumber: "El número telefónico es un campo obligatorio"
                    })
                else if (!/^[0-9]*$/.test(valueInput))
                    setError({
                        ...error,
                        phoneNumber: "El número telefónico solo debe contener números"
                    })
                else if (valueInput.length <= 7)
                    setError({
                        ...error,
                        phoneNumber: "El número telefónico debe contener por lo menos 8 números"
                    })
                else if (valueInput.length >= 15)
                    setError({
                        ...error,
                        phoneNumber: "El número telefónico debe contener máximo 15 números"
                    })
                else
                    setError({
                        ...error,
                        phoneNumber: ''
                    })
                break;

            default:
        }

        setInput({
            ...input,
            [e.target.name]: e.target.value
        })

    }
    async function handleSubmit(evento)//funcion llamada por onsubmit para despachar la accion registerUser
    {
        evento.preventDefault();

        dispatch(completeSignUp(loggedUser.id, { cityId: input.city, phoneNumber: input.phoneNumber }));
        alert("Registro completado satisfactoriamente")
    }

    return (
        <div>
            <div className="flex justify-center mt-8">
                <form className="w-96" onSubmit={async (e) => await handleSubmit(e)}>
                    <h1 className="font-bold flex justify-center text-lg">Completa tu registro!</h1>
                    <div>
                        <div className="flex flex-col mt-2">
                            <label>Teléfono</label>
                            <input placeholder="Escribe aquí" className="input input-bordered w-full" name="phoneNumber" onChange={(e) => handleInputChange(e)} value={input.phoneNumber} />
                            {!error.phoneNumber ? null : <span>{error.phoneNumber}</span>}
                        </div>
                        <div>
                            <label>País de origen</label>
                            <select className="select w-full max-w-xs" name="country" onChange={(e) => handleInputChange(e)}>
                                <option disabled selected>elegir</option>
                                {countries?.map(country =>
                                    <option value={country.id}>{country.name}</option>)
                                }
                            </select>
                        </div>
                        <div>
                            <label>Ciudad de origen</label>
                            <select className="select w-full max-w-xs" name="city" onChange={(e) => handleInputChange(e)}>
                                <option disabled selected>elegir</option>
                                {countries
                                    .find(country => country.id === input.country)
                                    ?.cities
                                    .map(city =>
                                        <option value={city.id}>{city.name}</option>)
                                }
                            </select>
                        </div>
                        <div className="mt-6 flex justify-center">
                            <button className="btn" type="submit">Crear</button>
                        </div>
                    </div>
                </form>
            </div>

        </div>);
};

export default CompleteSignUpForm;