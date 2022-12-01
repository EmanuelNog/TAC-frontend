import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/mongo/api';
import './eventRegister.css';


export default function EventRegister() {

    const userId = localStorage.getItem('userId')
    const token = localStorage.getItem('token')
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [measurements, setMeasurements] = useState('');
    const [deviceId, setDeviceId] = useState('');
    const [devices, setDevices] = useState([])

    useEffect(() => {
        api.get(`device`,{
            headers:{
                token: token
            }
        }).then(res => {
            setDevices(res.data)
            console.log(res.data)
        })
    },[userId])

    async function handleRegister(e) {
        e.preventDefault();

        const payloadData = {
            name: name,
            measurements: measurements,
            deviceId: deviceId,
            userId: userId
        }

        try {
            await api.post(`measurement/`, payloadData,{
                headers:{
                    token:token,
                }
            });
            alert(`Area sucessfully registered`);
            navigate("/usereventlist")
            console.log(payloadData)
        } catch (err) {
            alert(err);
        }
    }

    function handleShit(e){
        setDeviceId(e)
        console.log(deviceId)
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>

                <h1>Cadastro</h1>
                <p> </p>

                <Link className="back-link" to="/usereventlist">
                    Retornar
                </Link>
                </section>

                <div>
                    <form onSubmit={handleRegister}>
                        <input
                            placeholder="Nome do Evento"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                        <input
                            placeholder="Medidas do Evento"
                            value={measurements}
                            onChange={e => setMeasurements(e.target.value)}
                        />
                        <select name = "Dispositivos" id="devices" onChange={e => setDeviceId(e.target.value)}>
                            {devices.map(device =>(
                                <option value = {device._id}> {device.name} </option>
                            ))}
                        </select>
                        <button className="button" onClick={handleRegister}>Cadastrar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
