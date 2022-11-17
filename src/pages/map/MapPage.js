import React, { useState, useRef, useCallback } from "react";
import { GoogleMap, useJsApiLoader,Polygon, LoadScript } from '@react-google-maps/api';
import './MapPage.css'



export default function MapPage() {

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyAg8uN-IuxElu3eXXOxp10hN0rQzsfupPk"
    })

    const [path, setPath] = useState([
        {lat: -25.297019, lng: -54.116402},
        {lat: -25.301738, lng: -54.117491},
        {lat: -25.300826, lng: -54.108854}
    ])

    const polygonRef = useRef(null);
    const listenersRef = useRef([]);

    const onEdit = useCallback(()=> {
        if (polygonRef.current){
            const nextPath = polygonRef.current.getPath().getArray().map(pathPostition => {
                return {lat: pathPostition.lat(), lng: pathPostition.lng()}
            })
            setPath(nextPath)
        }
    }, [setPath])

    const onLoad = useCallback( polygon => {
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

    console.log("The path state is", path)

    return (
    <div className="layout">
        <div className="menu">
            <h1>texto</h1>
            <button> inserir marcador</button>
        </div>
        <div className = "map">
        {//isLoaded ? (
            <LoadScript
            id="script-loader"
            googleMapsApiKey="AIzaSyAg8uN-IuxElu3eXXOxp10hN0rQzsfupPk"
            language="en"
            region="us"
            >
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
            </LoadScript>
            //) : <></>
            }
        </div>
    </div>);
};










