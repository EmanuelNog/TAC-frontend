import React, { useState, useRef, useCallback } from "react";
import { GoogleMap, useJsApiLoader,Polygon, LoadScript } from '@react-google-maps/api';
import {Link, useNavigate, useLocation} from "react-router-dom"
import './mapPage.css'
import api from "../../services/api";



export default function MapPage() {

    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyAg8uN-IuxElu3eXXOxp10hN0rQzsfupPk"
    })

    const {state} = useLocation()
    const {area} = state
    const parsePath = JSON.parse(area.geoloc)
    // console.log(parsePath)

    const [path, setPath] = useState(parsePath)
    // const [path, setPath] = useState([
    //     {lat: -25.297019, lng: -54.116402},
    //     {lat: -25.301738, lng: -54.117491},
    //     {lat: -25.300826, lng: -54.108854}
    // ])

    const polygonRef = useRef(null);
    const listenersRef = useRef([]);

    const onEdit = useCallback(()=> {
        if (polygonRef.current){
            const nextPath = polygonRef.current.getPath().getArray().map(pathPosition => {
                return {lat: pathPosition.lat(), lng: pathPosition.lng()}
            })
            setPath(nextPath)
        }
    }, [setPath])

    const onLoad = useCallback( (polygon) => {
        polygonRef.current = polygon
        const path = polygon.getPath()
        listenersRef.current.push(
            path.addListener("set_at", onEdit),
            path.addListener("insert_at", onEdit),
            path.addListener("remove_at", onEdit)
        )
    }, [onEdit])

    const onUnmount = useCallback(()=> {
        listenersRef.current.forEach(lis => lis.remove())
        polygonRef.current = null;
    }, [])

    // function handleReturn(){
    //     navigate("/usermaplist")
    // }

    console.log("O caminho do mapa e", path);

    return (
    <div className="layout">
        <div className="menu">
            <Link className="back-link" to="/usermaplist">
                Retornar
            </Link>
        </div>
        <div className = "map">
            {isLoaded ? (
                // <LoadScript
                // id="script-loader"
                // googleMapsApiKey="AIzaSyAg8uN-IuxElu3eXXOxp10hN0rQzsfupPk"
                // language="en"
                // region="us"
                // >
                    <GoogleMap
                        mapContainerStyle = {{ width: "100%", height: "100%" }}
                        center = {{ lat:-25.30035527665852, lng: -54.11496429483141 }}
                        zoom = {16}
                    >
                        <Polygon
                        editable
                        draggable
                        path = {path}
                        onMouseUp = {onEdit}
                        onDragEnd = {onEdit}
                        onLoad = {onLoad}
                        onUnmount = {onUnmount}
                        />
                    </GoogleMap>
                // </LoadScript>
             ) : <></> }
        </div>
    </div>);
};










