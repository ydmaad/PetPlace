import { useMapContext } from '../provider/MapProvider';
import React from 'react';
import useKakaoLoader from '../useKakaoLoader';

export default function Search() {
    useKakaoLoader();

    const { map, setMarkers } = useMapContext();
    const [ search, setSearch ] = React.useState('');

    const fetchPlaces = () => {
        const ps = new kakao.maps.services.Places()
        ps.keywordSearch(search, (data, status) => {
            if (status === kakao.maps.services.Status.OK) {
                const bounds = new kakao.maps.LatLngBounds()
                const markers = [];
                for (let i = 0; i < data.length; i++) {
                    const item = data[i];
                    markers.push({
                        position: {
                            lat: data[i].y,
                            lng: data[i].x,
                        },
                        content: data[i].place_name,
                        url: data[i].place_url,
                    })
                    setMarkers(markers);
                    bounds.extend(new kakao.maps.LatLng(item.y, item.x))
                }
                map.setBounds(bounds)
            }
        });
    }
    

    return (
        // TODO: 요 기
        <div>
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} className="p-2 border border-gray-300 rounded-lg" />
            <button onClick={fetchPlaces} className="p-2 bg-blue-500 text-white rounded-lg">검색</button>
        </div>
    )
}
