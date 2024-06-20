import axios from "axios";
import React, { useEffect } from "react";
import Arrange from "../components/Arrange";
import Header from "../components/Header";
import supabase from "../lib/Supabase";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useMapContext } from "../provider/MapProvider";

const MyPage = () => {
  const { filterState } = useMapContext();
  // eslint-disable-next-line no-unused-vars
  const [filter, __] = filterState;
  const [filteredData, setFilteredData] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [userEmail, setUserEmail] = React.useState("");
  const queryClient = useQueryClient();
  const {
    data: favoriteList = [],
    error,
    isLoading,
  } = useQuery({
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
          ? old.filter((id) => id !== markerId)
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

  useEffect(() => {
    supabase.getSession().then((data) => setUserEmail(data.session.user.email));
  }, []);

  useEffect(() => {
    setFilteredData(
      data.filter(
        (marker) => filter === "" || marker.category_name.includes(filter)
      )
    );
  }, [data, filter]);

  useEffect(() => {
    if (favoriteList.length === 0) return;

    async function fetchPlaces() {
      const _data = [];
      for (let i = 0; i < favoriteList.length; i++) {
        const data = await axios.get(
          `https://corsproxy.io/?${encodeURIComponent(
            `https://place.map.kakao.com/main/v/${favoriteList[i]}`
          )}`
        );
        _data.push({
          name: data.data.basicInfo.placenamefull,
          category_name: `${data.data.basicInfo.category.cate1name ?? ""} > ${
            data.data.basicInfo.category.catename ?? ""
          }`,
          imgUrl: data.data.photo?.photoList[0]?.list[0].orgurl ?? "",
          url: `https://place.map.kakao.com/${favoriteList[i]}`,
          id: favoriteList[i],
        });
      }
      setData(_data);
    }
    fetchPlaces();
  }, [favoriteList]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="w-full">
      <div className="w-3/4 mx-auto">
        <Header showSearchBar={false} />
        <div className="flex justify-center items-center w-full">
          <div className="w-full">
            <div className="flex flex-col justify-center items-center w-full">
              <div className="flex justify-center">
                <img
                  alt="Tailwind CSS Navbar component"
                  className="rounded-full w-12 mr-4"
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                />
                <h3 className="text-2xl font-semibold mt-3">{userEmail}</h3>
              </div>
            </div>
            <div className="my-5 p-6">
              <div className="flex items-center text-center mb-6">
                <h3 className="text-3xl font-bold min-w-44">북마크 장소</h3>
                <div className="w-full">
                  <Arrange />
                </div>
              </div>
              {data.length === 0 ? (
                <div className="text-3xl text-center text-gray-500 mt-28">
                  북마크 목록이 존재하지 않습니다!!
                </div>
              ) : (
                <div className="grid grid-cols-5 max-2xl:grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 gap-10 box-border h-[74vh] overflow-y-auto p-5">
                  {filteredData.map((data, index) => (
                    <div
                      key={index}
                      className="card max-w-xs h-96 bg-violet-50 shadow-xl mb-8"
                    >
                      <Link
                        to={data.url}
                        className="flex flex-col items-center"
                      >
                        <img
                          src={data.imgUrl}
                          alt={data.name}
                          className="w-full h-48 object-cover cursor-pointer"
                          onClick={() => window.open(data.url, "_blank")}
                        />
                        <div className="card-title justify-center mt-4 px-4">
                          {data.name}
                        </div>
                      </Link>
                      <div className="flex justify-end p-2 mt-auto">
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            setBookmarkMutation.mutate(data.id);
                          }}
                        >
                          삭제
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
