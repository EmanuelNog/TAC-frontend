import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './pages/login/login';
// import Register from './pages/register/register';
import MapPage from './pages/map/MapPage';


export default function RoutingTable(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<Login/>}/>
                {/* <Route path="/register" element={Register}/> */}
                <Route path="/map" exact element={<MapPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}
