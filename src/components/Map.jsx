'use client'

import React from "react";
import { Map as KakaoMap, MapMarker } from "react-kakao-maps-sdk";
import { useMapContext } from '../provider/MapProvider'
import useKakaoLoader from "../useKakaoLoader";

export default function Map(geoLoc = false) {
    useKakaoLoader();

    const { mapState, markerState } = useMapContext();
    const [ _, setMap ] = mapState;
    const [ markers, __ ] = markerState;

    const [result, setResult] = React.useState("");
    const [location, setLocation] = React.useState({ latitude: 33.450701, longitude: 126.570667 });

	React.useEffect(() => {
        if (!geoLoc) return;
		navigator.geolocation.getCurrentPosition((response) => {
            const { latitude, longitude } = response.coords;
            setLocation({ latitude, longitude });
        });
	}, []);

    return (
        <div>
            <KakaoMap
                id="map"
                center={{
                    lat: location.latitude,
                    lng: location.longitude,
                }}
                style={{
                    height: "70vh",
                    width: "70vh",
                }}
                level={3}
                onCreate={setMap}
                onDragEnd={(map) => {
                    const latlng = map.getCenter()
                    setResult(`변경된 지도 중심좌표는 ${latlng.getLat()} 이고, 경도는 ${latlng.getLng()} 입니다`,)
                }}
            >
                {markers.map((marker) => (
                    <MapMarker
                        key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
                        position={marker.position}
                        onClick={() => {
                            // 새로운 창 열기: marker.url
                            window.open(marker.url, "_blank");
                        }}
                    />
                ))}
                
            </KakaoMap>
            <span>{result}</span>
        </div>
    )
}
