import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './pages/login/login';
import Register from './pages/register/register';
import MapPage from './pages/map/mapPage';
import UserMapList from './pages/userMapList/userMapList';
import MapRegister from './pages/mapRegister/mapRegister';
import Test from './pages/test/test';


export default function RoutingTable(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/map" exact element={<MapPage/>}/>
                <Route path="/usermaplist" exact element={<UserMapList/>}/>
                <Route path="/mapregister" exact element={<MapRegister/>}/>
                <Route path="/test" exact element={<Test/>}/>
            </Routes>
        </BrowserRouter>
    );
}
