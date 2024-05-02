import React from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import geojson from "../datas/korea.json";

function Map() {
  const configMap = {
    center: [36.5, 127.5],
    zoom: 7,
    style: { height: "600px", width: "100%" },
  };

  const handlerGEOShape = (e, feature) => {
    console.log(feature);
  };
  const style = (feature) => {
    return {
      fillColor: feature.properties.color,
      weight: 2,
      opacity: 1,
      color: "black",
      dashArray: "3",
      fillOpacity: 0.5,
    };
  };

  return (
    <MapContainer
      center={configMap.center}
      zoom={configMap.zoom}
      style={configMap.style}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
      />{" "}
      <GeoJSON
        data={geojson}
        style={style}
        eventHandlers={{
          click: (e) => {
            handlerGEOShape(e, e.originalEvent.target);
          },
        }}
      />
    </MapContainer>
  );
}

export default Map;
