import React, { useEffect, useState } from "react";
import * as L from "leaflet";
import "./Map.css";

const Map = ({ regions }) => {
  const [showMap, setShowMap] = useState();
  const [map, setMap] = useState(null);

  function initMap() {
    const map = L.map("map").setView([41.96289499554899, 75.66795603243295], 7);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
    setMap(map);
  }

  function renderPolygon(polygon, map) {
    L.geoJSON(polygon).addTo(map);
  }

  useEffect(() => {
    if (showMap) {
      initMap();
    }
  }, [showMap]);

  useEffect(() => {
    regions.forEach((region) => {
      if (map != null) renderPolygon(region.polygon, map);
    });
  }, [map, regions]);

  return (
    <div>
      <MapButton setShowMap={setShowMap} showMap={showMap} />
      {showMap && <div id="map"></div>}
    </div>
  );
};

const MapButton = ({ setShowMap, showMap }) => {
  function Click() {
    setShowMap(!showMap);
  }

  return (
    <button onClick={Click}>
      {showMap ?  "Скрыть карту ":"Показать карту"}
    </button>
  );
};

export default Map;
