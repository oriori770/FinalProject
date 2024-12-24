import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './MapComp.css';
import {IPointOnMap} from "../../types/Terrorism"


const markerIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconAnchor: [6, 20],
  popupAnchor: [1, -15],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [20, 20],
  iconSize: [15, 25],
});

const UpdateMapSize = () => {
  const map = useMap();
  useEffect(() => {
    map.invalidateSize();
  }, [map]);
  return null;
};

const MapComp  = ({points}:{points: IPointOnMap[]}) => {
points = points.map((point) => ({...point, mapCoordinates: [point.mapCoordinates[0]||1, point.mapCoordinates[1]||1]}));  
  return (

      <div id="map" className="map-container">
        <MapContainer
          center={[33.933305, 35.667051]}
          zoom={10}
          style={{ height: '90vh', width: '100%' }}
          whenReady={() => {
            setTimeout(() => {
              const map = document.querySelector('.leaflet-container') as HTMLElement;
              map.style.opacity = '1';
            }, 100);
          }}
        >
          <UpdateMapSize />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {points.map((point, index) => (
              <Marker key={index} position={point.mapCoordinates} icon={markerIcon}>
              <Popup>{point.data}</Popup>
              </Marker>
            ))}
        </MapContainer>
      </div>
  );
};

export default  MapComp;
