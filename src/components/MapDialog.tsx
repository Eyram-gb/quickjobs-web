import React, { useRef } from "react";
import { MapContainer, Popup, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { BriefcaseBusiness } from "lucide-react"
import { DialogContent } from './ui/dialog'
import L from 'leaflet';



export const MapDialog = ({ latitude, longitude, gigTitle }: { latitude: number, longitude: number, gigTitle: string }) => {
  return (
    <div>
          {/* <Dialog>
              <DialogTrigger>Open</DialogTrigger> */}
              <DialogContent className='w-[60vw] p-8'>
                  <Map latitude={latitude} longitude={longitude} gigTitle={gigTitle} />
                  {/* </DialogHeader> */}
              </DialogContent>
          {/* </Dialog> */}

    </div>
  )
}

const Map = ({ latitude, longitude, gigTitle }: { latitude: number, longitude: number, gigTitle: string }) => {
  const mapRef = useRef(null);
    const myIcon = L.icon({
        iconUrl: '/suitcase.png',
        iconSize: [25, 25],
        iconAnchor: [12.5, 41],
        popupAnchor: [0, -41],
    });
  return ( 
    // Make sure you set the height and width of the map container otherwise the map won't show
      <MapContainer center={[latitude, longitude]} zoom={13} ref={mapRef} style={{height: "50vh", width: "100%"}}>
        <TileLayer
        //   attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* Additional map layers or components can be added here */}
          <Marker
              position={[latitude, longitude]}
              icon={myIcon} // Use the selected icon
          >
              <Popup>
                  <b>Job Title</b><br />
                  <em>{gigTitle}</em><br />
              </Popup>
          </Marker>
      </MapContainer>
  );
};