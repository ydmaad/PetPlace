/* eslint-disable no-unused-vars */
import React from 'react';

const MapContext = React.createContext({
    mapState: [null, (_) => {}],
    markerState: [[], (_) => {}],
    // markers: [{
    //     imgUrl: undefined,
    //     position: {
    //         lat: 0,
    //         lng: 0,
    //     },
    //     name: '',
    //     address_name: '',
    //     category_name: '',
    //     url: '',
    //     id: 0
    // }],
    // setMarkers: (_) => {},
});

export function useMapContext() {
    return React.useContext(MapContext);
}

// eslint-disable-next-line react/prop-types
export default function MapProvider({ children }) {
    const mapState = React.useState(null);
    const markerState = React.useState([]);

    return (
        <MapContext.Provider value={{ mapState, markerState }}>
            {children}
        </MapContext.Provider>
    );
}