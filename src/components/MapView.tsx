"use client"

import L, { LatLngExpression } from 'leaflet'

import  { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';

const markIcon= new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
})

function MapView() {
    const [position, setPosition] = useState<[number, number]|null>(null);

    if(!position) return null
  return (
    <MapContainer center={position as LatLngExpression} zoom={13} scrollWheelZoom={true} className='w-full h-full'>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
     <Marker icon={markIcon} position={position}
     draggable={true}
     eventHandlers={{
      dragend: (e:L.LeafletEvent) => {
        const marker=e.target as L.Marker
        const {lat,lng}=marker.getLatLng()
        setPosition([lat,lng])
      }
     }}

     
     />
     
  </MapContainer>
  )
}

export default MapView