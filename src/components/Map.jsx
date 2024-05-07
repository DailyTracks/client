import React from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "../styles/Map.css";
import "leaflet/dist/leaflet.css";
import geojson from "../datas/korea.json";

import { useNavigate } from "react-router-dom";

function Map() {
  const navigate = useNavigate();
  const handleClick = (regionTerm) => {
    navigate(`/board?region=${encodeURIComponent(regionTerm)}`);
    // navigate(`/board?region=${regionTerm}`);
  };

  function openNewBoardPage() {
    navigate("/board/new");
  }

  const configMap = {
    center: [36.5, 127.5],
    zoom: 7,
    style: {
      height: "50vw",
      width: "100%",
      transition: "width 0.3s ease-in",
    },
  };

  // const handlerGEOShape = (e, feature) => {
  //   console.log(feature);
  // };

  const cityStyle = (feature) => {
    return {
      weight: 2,
      opacity: 1,
      color: "black",
      dashArray: "3",
      fillOpacity: 0.5,
    };
  };

  const mouseoverColor = (event) => {
    event.target.setStyle({
      color: "green",
      fillColor: "black",
      fillOpacity: 0.7,
    });
  };
  const mouseoutColor = (event) => {
    event.target.setStyle({
      weight: 2,
      opacity: 1,
      color: "black",
      dashArray: "3",
      fillOpacity: 0.5,
    });
  };

  const changeCityColor = (event) => {
    event.target.setStyle({
      color: "green",
      fillColor: "red",
      fillOpacity: 0.7,
    });
  };
  const onEachCities = (city, layer) => {
    const regionName = city.properties.CTP_KOR_NM;
    // const regionName = city.properties.CTP_ENG_NM;

    layer.bindPopup(regionName);

    layer.on({
      mouseover: mouseoverColor,
      mouseout: mouseoutColor,
      click: (e) => {
        changeCityColor(e);
        handleClick(regionName);
      },
    });
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
        style={cityStyle}
        onEachFeature={onEachCities}
        eventHandlers={{
          click: (e) => {
            // handlerGEOShape(e, e.originalEvent.target);
          },
        }}
      />
      <button onClick={openNewBoardPage} className="new_btn">
        New
      </button>
    </MapContainer>
  );
}

export default Map;
