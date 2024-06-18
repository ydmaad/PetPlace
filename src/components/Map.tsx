'use client'

import React from "react";
import { Map as KakaoMap, MarkerClusterer, MapMarker } from "react-kakao-maps-sdk";
import { useMapContext } from '../provider/MapProvider'
import useKakaoLoader from "../useKakaoLoader";

export default function Map({
    geoLoc = false,
    className = "",
    style = {},
}) {
    const { setMap, markers } = useMapContext();
    useKakaoLoader();

    const mapRef = React.useRef<kakao.maps.Map>(null);
    const [result, setResult] = React.useState<string>("");
    const [location, setLocation] = React.useState({ latitude: 33.450701, longitude: 126.570667 });

	React.useEffect(() => {
		navigator.geolocation.getCurrentPosition((response) => {
            const { latitude, longitude } = response.coords;
            setLocation({ latitude, longitude });
        });
	}, []);

    return (
        <KakaoMap
            id="map"
            center={{
                lat: location.latitude,
                lng: location.longitude,
            }}
            className={className}
            style={style}
            level={3}
            ref={mapRef}
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
            <span>{result}</span>
        </KakaoMap>
    )
}
