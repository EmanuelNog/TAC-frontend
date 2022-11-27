import React from 'react';
import {Link, useHistory, useNavigate } from 'react-router-dom';
import './menu.css';

export default function Menu() {

    const navigate = useNavigate()

    function handleLogout() {
        localStorage.clear()
        navigate('/')
    }

    return (
        <div className='menu-container'>
            <header>
                <button onClick={handleLogout} type="button"> Deslogar </button>
            </header>

            <h1>Menu</h1>

            <ul>
                <li>
                    <button onClick={()=> navigate('/usermaplist')} className=""> Areas </button>
                </li>
                <li>
                    <p> </p>
                    <button onClick={()=> navigate('/userdevicelist')} className=""> Dispositivos </button>
                </li>
                <li>
                    <p> </p>
                    <button onClick={()=> navigate('/usereventlist')} className=""> Eventos </button>
                </li>
            </ul>

        </div>
    )
}
