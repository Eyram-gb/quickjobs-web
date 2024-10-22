'use client'
import React, { useRef } from "react";
import { MapContainer, Popup, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { BriefcaseBusiness } from "lucide-react";


const Map = ({latitude, longitude}:{latitude:number, longitude:number}) => {
  const mapRef = useRef(null);

  return ( 
    // Make sure you set the height and width of the map container otherwise the map won't show
      <MapContainer center={[latitude, longitude]} zoom={13} ref={mapRef} style={{height: "50vh", width: "60vw"}}>
        <TileLayer
        //   attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* Additional map layers or components can be added here */}
          <Marker
              position={[latitude, longitude]}
              icon={<BriefcaseBusiness />} // Use the selected icon
          >
              <Popup>
                  <b>Company</b><br />
                  <em>Job Title</em><br />
              </Popup>
          </Marker>
      </MapContainer>
  );
};

export default Map