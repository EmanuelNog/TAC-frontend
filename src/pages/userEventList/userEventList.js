import React, { useState, useEffect } from "react";
import {Link, useNavigate} from 'react-router-dom';
import './userEventList.css'
import api from "../../services/mongo/api";

export default function UserEventList() {

    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    const navigate = useNavigate()

    const [measurements, setMeasurements] = useState([])

    useEffect(() => {
        api.get(`measurement/user/${userId}`,{
            headers:{
                token: token
            }
        }).then(res => {
            setMeasurements(res.data)
            console.log(res.data)
        })
    },[userId])
    // ^ tirar esse userId pra ver oq da

    async function handleDelete(measurementId){
        try{
          await api.delete(`measurement/${measurementId}`,{
            headers:{
                token:token
            }
          })
        }catch(err){
            alert(err)
        }
    }


    return (
    <div className="layout">
        <div>
            <h1> Eventos - Medicoes </h1>
            <Link className="newDevice" to="/eventregister">
                Incluir Novo
            </Link>
        </div>
        <ul>
            {measurements.map(measurement =>(
                <div>
                <li key={measurement._id}>
                    <h2>{measurement.name}</h2>
                    <h5>{measurement.measurements}</h5>
                    <button onClick={() => handleDelete(measurement._id)} type="button">
                        Deletar
                    </button>
                </li>
            </div>
            ))}
        </ul>
    </div>);
};










