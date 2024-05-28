import React from "react";
import { MapContainer, TileLayer, GeoJSON, useMapEvents } from "react-leaflet";
import "../styles/Map.css";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";
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

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const getColor = (regionName) => {
    return getRandomColor();
    // switch (regionName) {
    //   case "서울특별시":
    //     return "#ff0000";
    //   case "부산광역시":
    //     return "#00ff00";
    //   case "대구광역시":
    //     return "#0000ff";
    //   case "강원도":
    //     return "#ff7f00";
    //   // Add more cases for other regions
    //   default:
    //     return "#ffffff";
    // }
  };

  const cityStyle = (feature) => {
    return {
      weight: 2,
      opacity: 1,
      color: "black",
      dashArray: "3",
      fillOpacity: 0.5,
      fillColor: getColor(feature.properties.CTP_KOR_NM),
    };
  };

  const mouseoverColor = (event) => {
    event.target.setStyle({
      color: "green",
      // fillColor: "black",
      fillOpacity: 1,
    });
  };
  const mouseoutColor = (event) => {
    event.target.setStyle({
      weight: 2,
      opacity: 1,
      color: "black",
      dashArray: "3",
      fillOpacity: 0.5,
      fillColor: getColor(event.target.feature.properties.CTP_KOR_NM),
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
        // changeCityColor(e);
        handleClick(regionName);
      },
    });
  };

  const MapEvents = () => {
    useMapEvents({
      zoomend: (e) => {
        const newZoom = e.target.getZoom();
        console.log("newZoom : " + newZoom);
      },
    });
    return null;
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
      />
      <GeoJSON
        // data={geojson}
        key={geojson}
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
      <MapEvents />
    </MapContainer>
  );
}

export default Map;
