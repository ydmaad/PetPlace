'use client';

import React from 'react';
import { useEffect } from 'react';
import supabase from '../lib/Supabase';
import { useMapContext } from '../provider/MapProvider';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const List = () => {
    const { markerState, filterState } = useMapContext();
    // eslint-disable-next-line no-unused-vars
    const [ markers, _ ] = markerState;
    // eslint-disable-next-line no-unused-vars
    const [ filter, __ ] = filterState;
    const queryClient = useQueryClient();

    const [ filteredMarkers, setFilteredMarkers ] = React.useState([]);
    useEffect(() => {
        console.log("filter", filter);
        setFilteredMarkers(markers.filter(marker => 
            filter === '' || marker.category_name.includes(filter)
        ));
    }, [markers, filter]);
    

    const { data: favoriteList = [], error, isLoading } = useQuery({
        queryKey: ["favoriteList"],
        queryFn: () => supabase.getBookmarks(),
    });

    const setBookmarkMutation = useMutation({
        mutationFn: async (markerId) => {
            const isFavorite = favoriteList.includes(markerId);
            return await supabase.setBookmark(markerId, !isFavorite);
        },
        onMutate: async (markerId) => {
            await queryClient.cancelQueries({ queryKey: ["favoriteList"] });
            const previousFavorites = queryClient.getQueryData(["favoriteList"]);

            queryClient.setQueryData(["favoriteList"], (old) =>
                old.includes(markerId)
                    ? old.filter(id => id !== markerId)
                    : [...old, markerId]
            );

            return { previousFavorites };
        },
        onError: (err, markerId, context) => {
            queryClient.setQueryData(["favoriteList"], context.previousFavorites);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["favoriteList"] });
        },
    });

    // Optimistic update function
    const handleFavoriteClick = (markerId) => {
        setBookmarkMutation.mutate(markerId);
    };

    if (isLoading) {
        return (<div>Loading...</div>);
    }

    if (error) {
        return (<div>Error: {error.message}</div>);
    }

    return (
            <div className="grid grid-cols-3 max-2xl:grid-cols-2 gap-10 box-border h-[74vh] md:overflow-y-auto">
                {(filteredMarkers ?? []).map((marker, index) => (
                    <div className="card max-w-xs bg-violet-50 shadow-xl" key={index} data-id={marker.id}>
                        <figure>
                            <img src={marker.imgUrl} onError={(img) => img.target.src = 'https://i.imgur.com/h9L8stu_d.webp'} alt="Image"  className="w-full h-48 object-cover cursor-pointer" onClick={() => window.open(marker.url, "_blank")}/>
                        </figure>
                        <div className="card-body">
                            <h3 className="card-title justify-center">
                                {marker.name}
                            </h3>
                            <div className="card-actions justify-end items-end">
                                <div className="badge bg-white p-4 shadow-sm">{marker.category_name}</div>
                                <button className="bg-transparent" onClick={() => handleFavoriteClick(marker.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" id={`post-${marker.id}`} fill={favoriteList.includes(marker.id) ? "#FF0084" : "none"} viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
    );
};

export default List;
