import React, { useState, useRef, useCallback, useEffect } from "react";
import { GoogleMap, useJsApiLoader,Polygon, LoadScript } from '@react-google-maps/api';
import { useLocation } from "react-router-dom";
import api from "../../services/api";

export default function Test() {

    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    const mapId = localStorage.getItem('mapId')

    const {state} = useLocation()
    const {area} = state
    const parsePath = JSON.parse(area.geoloc)


    function print(){
        // console.log(maps)
        console.log(parsePath)
    }

    return (
    <div className="layout">
        <h1> h1 </h1>
        <h2>  h2 </h2>
        <button onClick={print}> click</button>
    </div>);
};










