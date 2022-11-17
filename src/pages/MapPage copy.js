import React, { useState, useRef, useCallback } from "react";
import ReactDOM from "react-dom";
import { LoadScript, GoogleMap, Polygon } from "@react-google-maps/api";

import "./styles.css";

function Index2() {
  // Store Polygon path in state
  const [path, setPath] = useState([
    {lat: -25.297019, lng: -54.116402},
    {lat: -25.301738, lng: -54.117491},
    {lat: -25.300826, lng: -54.108854}
  ]);

  // Define refs for Polygon instance and listeners
  const polygonRef = useRef(null);
  const listenersRef = useRef([]);

  // Call setPath with new edited path
  const onEdit = useCallback(() => {
    if (polygonRef.current) {
      const nextPath = polygonRef.current
        .getPath()
        .getArray()
        .map(latLng => {
          return { lat: latLng.lat(), lng: latLng.lng() };
        });
      setPath(nextPath);
    }
  }, [setPath]);

  // Bind refs to current Polygon and listeners
  const onLoad = useCallback(
    polygon => {
      polygonRef.current = polygon;
      const path = polygon.getPath();
      listenersRef.current.push(
        path.addListener("set_at", onEdit),
        path.addListener("insert_at", onEdit),
        path.addListener("remove_at", onEdit)
      );
    },
    [onEdit]
  );

  // Clean up refs
  const onUnmount = useCallback(() => {
    listenersRef.current.forEach(lis => lis.remove());
    polygonRef.current = null;
  }, []);

  console.log("The path state is", path);

  return (
    <div className="App">
      <LoadScript
        id="script-loader"
        googleMapsApiKey="AIzaSyAg8uN-IuxElu3eXXOxp10hN0rQzsfupPk"
        language="en"
        region="us"
      >
        <GoogleMap
          mapContainerClassName="App-map"
          center = {{ lat:-25.30035527665852, lng: -54.11496429483141 }}
          zoom={16}
          version="weekly"
          on
        >
          <Polygon
            // Make the Polygon editable / draggable
            editable
            draggable
            path={path}
            // Event used when manipulating and adding points
            onMouseUp={onEdit}
            // Event used when dragging the whole Polygon
            onDragEnd={onEdit}
            onLoad={onLoad}
            onUnmount={onUnmount}
          />
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default Index2();
