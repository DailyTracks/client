import React from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "../styles/Map.css";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";
import geojson from "../datas/korea.json";
import axios from "axios";

import { useNavigate } from "react-router-dom";

function Map() {
  const navigate = useNavigate();
  const [geoStatus, setGeoStatus] = useState([]);

  const handleClick = (regionTerm) => {
    navigate(`/board?region=${encodeURIComponent(regionTerm)}`);
  };

  useEffect(() => {
    axios
      .get("api/board/geo-status", { withCredentials: true })
      .then((response) => {
        setGeoStatus(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const configMap = {
    center: [36.5, 127.5],
    zoom: 7,
    style: {
      height: "50vw",
      width: "100%",
      transition: "width 0.3s ease-in",
    },
  };

  const getColor = (regionName) => {
    const regionData = geoStatus.find((region) => region.region === regionName);
    const regionCount = regionData ? regionData.regionCount : 0;

    switch (true) {
      case regionCount > 8:
        return "#120A8F";
      case regionCount > 6:
        return "#0033CC";
      case regionCount > 4:
        return "#4F86F7";
      case regionCount > 2:
        return "#553592";
      case regionCount > 0:
        return "#7DF9FF";
      default:
        return "#E0FFFF";
    }
  };

  const cityStyle = (feature) => {
    return {
      weight: 2,
      opacity: 1,
      color: "black",
      dashArray: "3",
      fillOpacity: 0.7,
      fillColor: getColor(feature.properties.CTP_KOR_NM),
    };
  };

  const mouseoverColor = (event) => {
    event.target.setStyle({
      weight: 2,
      opacity: 1,
      color: "black",
      dashArray: "3",
      fillOpacity: 1,
    });
  };
  const mouseoutColor = (event) => {
    event.target.setStyle({
      weight: 2,
      opacity: 1,
      color: "black",
      dashArray: "3",
      fillOpacity: 0.7,
    });
  };

  const onEachCities = (city, layer) => {
    const regionName = city.properties.CTP_KOR_NM;

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

  return (
    <MapContainer
      center={configMap.center}
      zoom={configMap.zoom}
      style={configMap.style}
      minZoom={7}
      maxZoom={10}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
      />
      <GeoJSON
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
    </MapContainer>
  );
}

export default Map;
