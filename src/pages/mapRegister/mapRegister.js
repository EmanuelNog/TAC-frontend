import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './mapRegister.css';


export default function MapRegister() {

    const userId = localStorage.getItem('userId')
    const token = localStorage.getItem('token')
    const navigate = useNavigate();

    const [type_area, setType_area] = useState('');
    const [inputFields, setInputFields] = useState([
        {lat: '', lng: ''}
    ])

    async function handleRegister(e) {
        e.preventDefault();
        inputFields.map((input) => {
            input.lat = parseFloat(input.lat)
            input.lng = parseFloat(input.lng)
        })
        const geolocString = JSON.stringify(inputFields);
        const payloadData = {
             type_area: type_area,
            geoloc: geolocString
        };

        try {
            await api.post(`users/${userId}/areas`, payloadData,{
                headers:{
                    token:token,
                }
            });
            alert(`Area sucessfully registered`);
            navigate("/usermaplist")
            console.log(payloadData)
        } catch (err) {
            alert(err);
        }
    }

    const handleFormChange = (index, event) => {
        let data = [...inputFields]
        data[index][event.target.name] = event.target.value
        console.log(data)
        setInputFields(data)
    }

    const addFields = () => {
        let newfield = {lat: '', lng: ''}
        setInputFields([...inputFields, newfield])
    }

    const removeFields = (index,e) => {
        e.preventDefault()
        let data = [...inputFields]
        data.splice(index,1)
        setInputFields(data)
    }

    return (
        <div className="register-container">
        <div className="content">
            <section>

            <h1>Cadastro</h1>
            <p> </p>

            <Link className="back-link" to="/usermaplist">
                Retornar
            </Link>
            </section>
            <div>
                <button onClick={addFields}> Adicionar Coordenadas </button>
                <form onSubmit={handleRegister}>
                    <input
                        placeholder="Tipo da Area"
                        value={type_area}
                        onChange={e => setType_area(e.target.value)}
                    />
                    {inputFields.map(( input, index ) => {
                        return (
                            <div className="layout" key={index}>
                                <input
                                    type = 'number'
                                    name = 'lat'
                                    placeholder = 'Latitude'
                                    value = {input.lat}
                                    onChange = {event => handleFormChange(index,event)}
                                />
                                <input
                                    type = 'number'
                                    name = 'lng'
                                    placeholder = 'Longitude'
                                    value = {input.lng}
                                    onChange = {event => handleFormChange(index,event)}
                                />
                                <button onClick={(e) => removeFields(index,e)}>Remover</button>
                            </div>
                        )
                    })}
                    <button className="button" onClick={handleRegister}>Cadastrar</button>
                </form>
            </div>
        </div>
    </div>
    );
}
