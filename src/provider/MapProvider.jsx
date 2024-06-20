import React from 'react';

const MapContext = React.createContext({
    mapState: [null, (_) => {}],
    markerState: [[], (_) => {}],
    filterState: ['', (_) => {}],
});

export function useMapContext() {
    return React.useContext(MapContext);
}

// eslint-disable-next-line react/prop-types
export default function MapProvider({ children }) {
    const mapState = React.useState(null);
    const markerState = React.useState([]);
    const filterState = React.useState('');

    return (
        <MapContext.Provider value={{ mapState, markerState, filterState }}>
            {children}
        </MapContext.Provider>
    );
}