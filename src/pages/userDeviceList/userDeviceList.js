import React, { useState, useEffect } from "react";
import {Link, useNavigate} from 'react-router-dom';
import './userDeviceList.css'
import api from "../../services/mongo/api";

export default function UserMapList() {

    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    const navigate = useNavigate()

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

    async function handleDeleteDevice(deviceId){
        try{
          await api.delete(`device/${deviceId}`,{
            headers:{
                token:token
            }
          })
        }catch(err){
            alert(err)
        }
    }

    function handleShowDevice(area){
        navigate('/map',{state:{area:area}})
    }

    return (
    <div className="layout">
        <div>
            <h1> Dispositivos</h1>
            <Link className="newDevice" to="/deviceregister">
                Incluir Novo
            </Link>
        </div>
        <ul>
            {devices.map(device =>(
                <div>
                <li key={device._id}>
                    <h2>{device.name}</h2>
                    <h5>{device.measurements}</h5>
                    <button onClick={() => handleShowDevice(device)} type="button">
                        Editar
                    </button>
                    <button onClick={() => handleDeleteDevice(device._id)} type="button">
                        Deletar
                    </button>
                </li>
            </div>
            ))}
        </ul>
    </div>);
};










