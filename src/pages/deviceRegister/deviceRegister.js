import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/mongo/api';
import './deviceRegister.css';


export default function DeviceRegister() {

    const userId = localStorage.getItem('userId')
    const token = localStorage.getItem('token')
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [measurements, setMeasurements] = useState('');

    async function handleRegister(e) {
        e.preventDefault();

        const payloadData = {
            name: name,
            measurements: measurements
        }

        try {
            await api.post(`device`, payloadData,{
                headers:{
                    token:token,
                }
            });
            alert(`Area sucessfully registered`);
            navigate("/userdevicelist")
            console.log(payloadData)
        } catch (err) {
            alert(err);
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>

                <h1>Cadastro</h1>
                <p> </p>

                <Link className="back-link" to="/userdevicelist">
                    Retornar
                </Link>
                </section>
                <div>
                    <form onSubmit={handleRegister}>
                        <input
                            placeholder="Nome do Dispositivo"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                        <input
                            placeholder="Medidas do Dispositivo"
                            value={measurements}
                            onChange={e => setMeasurements(e.target.value)}
                        />
                        <button className="button" onClick={handleRegister}>Cadastrar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
