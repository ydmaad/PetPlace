/* eslint-disable no-unused-vars */
import React from 'react';

const MapContext = React.createContext({
    map: null,
    setMap: (_) => {},

    markers: [ { position: { lat: 0, lng: 0 }, content: '' } ],
    setMarkers: (_) => {},
});

export function useMapContext() {
    return React.useContext(MapContext);
}

// eslint-disable-next-line react/prop-types
export default function MapProvider({ children }) {
    const [map, setMap] = React.useState(null);
    const [markers, setMarkers] = React.useState([]);

    return (
        <MapContext.Provider value={{ map, setMap, markers, setMarkers }}>
            {children}
        </MapContext.Provider>
    );
}