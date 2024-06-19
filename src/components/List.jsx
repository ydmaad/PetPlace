import React from 'react';
import { useMapContext } from '../provider/MapProvider';

const List = () => {
    const { markerState } = useMapContext();
    const [ markers, _ ] = markerState;

    const [favoriteList, setFavoriteList] = React.useState([]);

    const handleFavoriteClick = (markerId) => {
        const isFavorited = favoriteList.includes(markerId);
        if (isFavorited) {
            setFavoriteList(favoriteList.filter((id) => id !== markerId));
        } else {
            setFavoriteList([...favoriteList, markerId]);
        }
    };

    return (
        <div className="grid grid-cols-3 max-2xl:grid-cols-2 max-xl:grid-cols-1 gap-10 box-border h-[74vh] overflow-y-auto">
            {(markers ?? []).map((marker, index) => (
                // https://daisyui.com/docs/colors/ << primary, primary-content
                <div className="card max-w-72 max-h-80 bg-violet-50 shadow-xl" key={index}>
                    {/* bg-indigo-50 */}
                    <figure>
                        <img src={marker.imgUrl} onError={(img) => img.target.src = 'https://i.imgur.com/h9L8stu_d.webp'} alt="Image"  className="w-full max-h-48 object-cover cursor-pointer" onClick={() => window.open(marker.url, "_blank")}/>
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title justify-center">
                            {marker.name}
                        </h2>
                        <div className="card-actions justify-end items-end">
                            <div className="badge bg-white p-3 shadow-sm">{marker.category_name}</div>
                            <button className="bg-transparent" onClick={() => handleFavoriteClick(marker.id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={favoriteList.includes(marker.id) ? "#ffcce6" : "none"} viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default List