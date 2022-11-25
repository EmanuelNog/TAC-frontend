import React, { useState, useEffect } from "react";
import {Link, useNavigate} from 'react-router-dom';
import './userMapList.css'
import api from "../../services/api";

export default function UserMapList() {

    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    const navigate = useNavigate()

    const [maps, setMaps] = useState([])

    useEffect(() => {
        api.get(`users/${userId}/areas`,{
            headers:{
                token: token
            }
        }).then(res => {
            setMaps(res.data)
        })
    },[userId])

    function handleShowMap(area){
        navigate('/map',{state:{area:area}})
    }

    async function handleDeleteMap(areaId){
        try{
          await api.delete(`users/${userId}/areas/${areaId}`,{
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
            <h1> Suas Areas</h1>
            <Link className="newMap" to="/mapregister">
                Incluir Novo
            </Link>
        </div>
        <ul>
            {maps.map(area =>(
                <div>
                <li key={area.id}>
                    <h2>{area.type_area}</h2>
                    <button onClick={() => handleShowMap(area)} type="button">
                        Editar
                    </button>
                    <button onClick={() => handleDeleteMap(area.id)} type="button">
                        Deletar
                    </button>
                </li>
            </div>
            ))}
        </ul>
    </div>);
};










