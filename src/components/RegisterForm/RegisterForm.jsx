import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { createNewUser } from "../../redux/actions";

import { uploadFile } from "../../configFirebase";
import Upload from '../cloudinary/Upload';

const RegisterForm = () =>
{

    const dispatch = useDispatch();

    const [input, setInput] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        profileImage: null,
        password: "",
        username: "",
    });
    const [error, setError] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        profileImage: "",
        password: "",
        username: "",
    });

    function handleInputChange(e)
    {
        const nameInput = e.target.name;
        const valueInput = e.target.value;
        switch (nameInput)
        {
            case 'firstName':
                if (valueInput === '')
                    setError({
                        ...error,
                        firstName: 'El nombre es un campo obligatorio'
                    })
                else if (valueInput.length <= 2)
                    setError({
                        ...error,
                        firstName: 'El nombre debe tener por lo menos 3 letras'
                    })
                else if (valueInput.length >= 20)
                    setError({
                        ...error,
                        firstName: "El nombre debe tener un máximo de 20 letras"
                    })
                else if (!/^[A-Za-z0-9\s]+$/g.test(valueInput))
                    setError({
                        ...error,
                        firstName: "El nombre solo debe contener letras"
                    })
                else
                    setError({
                        ...error,
                        firstName: ''
                    })
                break;
            case 'lastName':
                if (valueInput === '')
                    setError({
                        ...error,
                        lastName: 'El apellido es un campo obligatorio'
                    })
                else if (valueInput.length <= 2)
                    setError({
                        ...error,
                        lastName: 'El apellido debe tener por lo menos 3 letras'
                    })
                else if (valueInput.length >= 20)
                    setError({
                        ...error,
                        lastName: "El apellido debe tener un máximo de 20 letras"
                    })
                else if (!/^[A-Za-z0-9\s]+$/g.test(valueInput))
                    setError({
                        ...error,
                        lastName: "El apellido solo debe contener letras"
                    })
                else
                    setError({
                        ...error,
                        lastName: ''
                    })
                break;
            case 'email':
                if (valueInput === '')
                    setError({
                        ...error,
                        email: "El email es un campo obligatorio"
                    })
                else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(valueInput))
                    setError({
                        ...error,
                        email: "El email debe ser un correo válido"
                    })
                else
                    setError({
                        ...error,
                        email: ''
                    })
                break;
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
            case 'profileImage':
                if (valueInput == null)
                    setError({
                        ...error,
                        profileImage: "Es obligatorio agregar una foto de perfil"
                    })
                else if (valueInput?.type !== "image/png" && valueInput?.type !== "image/jpeg")
                    setError({
                        ...error,
                        profileImage: "La extensión del archivo debe ser jpg o png"
                    })
                else
                    setError({
                        ...error,
                        profileImage: ''
                    })
                break;
            case 'password':
                if (valueInput === '')
                    setError({
                        ...error,
                        password: "La contraseña es un campo obligatorio"
                    })
                else if (valueInput.length <= 7)
                    setError({
                        ...error,
                        password: "La contraseña debe contener por lo menos 8 caracteres"
                    })
                else if (valueInput.length >= 15)
                    setError({
                        ...error,
                        password: "La contraseña debe contener máximo 15 caracteres"
                    })
                else
                    setError({
                        ...error,
                        password: ''
                    })
                break;
            case 'username':
                if (valueInput === '')
                    setError({
                        ...error,
                        username: "El nombre de usuario es un campo obligatorio"
                    })
                else if (valueInput.length <= 6)
                    setError({
                        ...error,
                        username: "El nombre de usuario debe contener por lo menos 6 caracteres"
                    })
                else if (valueInput.length >= 15)
                    setError({
                        ...error,
                        username: "El nombre de usuario debe contener máximo 15 caracteres"
                    })
                else
                    setError({
                        ...error,
                        username: ''
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
        const profileImage = await uploadFile(input.profileImage);
        const newUser = { ...input, profileImage };
        dispatch(createNewUser(newUser));
        // alert("Registro creado satisfactoriamente")
    }

    return (
        <div>
            <div className="flex justify-center mt-8">
                <form className="w-96" onSubmit={async (e) => await handleSubmit(e)}>
                    <h1 className="font-bold flex justify-center text-lg">Regístrate!</h1>
                    <div>
                        <div className="flex flex-col">
                            <label>Nombre</label>
                            <input type="text" placeholder="Escribe aquí" className="input input-bordered w-full" name="firstName" onChange={(e) => handleInputChange(e)} value={input.firstName} />
                            {!error.firstName ? null : <span>{error.firstName}</span>}
                        </div>
                        <div className="flex flex-col mt-2">
                            <label>Apellido</label>
                            <input type="text" placeholder="Escribe aquí" className="input input-bordered w-full" name="lastName" onChange={(e) => handleInputChange(e)} value={input.lastName} />
                            {!error.lastName ? null : <span>{error.lastName}</span>}
                        </div>
                        <div className="flex flex-col mt-2">
                            <label>Nombre de usuario</label>
                            <input type="text" placeholder="Escribe aquí" className="input input-bordered w-full" name="username" onChange={(e) => handleInputChange(e)} value={input.username} />
                            {!error.username ? null : <span>{error.username}</span>}
                        </div>
                        <div className="flex flex-col mt-2">
                            <label>Email</label>
                            <input placeholder="Escribe aquí" className="input input-bordered w-full" name="email" onChange={(e) => handleInputChange(e)} value={input.email} />
                            {!error.email ? null : <span>{error.email}</span>}
                        </div>
                        <div className="flex flex-col mt-2">
                            <label>Teléfono</label>
                            <input placeholder="Escribe aquí" className="input input-bordered w-full" name="phoneNumber" onChange={(e) => handleInputChange(e)} value={input.phoneNumber} />
                            {!error.phoneNumber ? null : <span>{error.phoneNumber}</span>}
                        </div>
                        <Upload
                            label='Foto de Perfil'
                            divClass="flex flex-col mt-2"
                            inputClass="file-input file-input-bordered w-full"
                            inputName="profileImage"
                            onChange={(e) => handleInputChange(e)}
                            error={!error.profileImage ? null : error.profileImage}
                        />
                        <div className="flex flex-col mt-2">
                            <label>Contraseña</label>
                            <input type="password" placeholder="Escribe aquí" className="input input-bordered w-full" name="password" onChange={(e) => handleInputChange(e)} value={input.password} />
                            {!error.password ? null : <span>{error.password}</span>}
                        </div>
                        <div className="mt-6 flex justify-center">
                            <button className="btn" type="submit">Crear</button>
                        </div>
                    </div>
                </form>
            </div>

        </div>);
};

export default RegisterForm;