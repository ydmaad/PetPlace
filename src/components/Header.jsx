'use client';

import { useMapContext } from '../provider/MapProvider';
import React from 'react';
import useKakaoLoader from '../useKakaoLoader';
import { Link } from 'react-router-dom';
import axios from 'axios';
import supabase from '../lib/Supabase';

const Header = (showSearchBar=false) => {
  useKakaoLoader();

  const { mapState, markerState } = useMapContext();
  const [ map, _ ] = mapState;
  const [ __, setMarkers ] = markerState;

  const [ userId, setUserId ] = React.useState('');
  const searchRef = React.useRef();

  const fetchPlaces = () => {
      const ps = new kakao.maps.services.Places()
      ps.keywordSearch(`애견동반 ${searchRef.current.value}`, (data, status) => {
        if (status === kakao.maps.services.Status.ZERO_RESULT) {
          setMarkers([]);
          alert('검색 결과가 존재하지 않습니다.');
        } else if (status === kakao.maps.services.Status.OK) {
          const bounds = new kakao.maps.LatLngBounds()
          const markers = [];
          for (let i = 0; i < data.length; i++) {
            const item = data[i];
            markers.push({
              imgUrl: undefined,
              position: {
                  lat: data[i].y,
                  lng: data[i].x,
              },
              name: data[i].place_name,
              address_name: data[i].address_name,
              category_name: data[i].category_name,
              url: data[i].place_url,
              id: data[i].id,
            })
            bounds.extend(new kakao.maps.LatLng(item.y, item.x))
          }
          map.setBounds(bounds);
          setMarkers(markers);

          for (let i = 0; i < markers.length; i++) {
            axios.get(`https://corsproxy.io/?${encodeURIComponent(`https://place.map.kakao.com/main/v/${markers[i].id}`)}`).then((res) => {
              if (res.data.photo && res.data.photo.photoList && res.data.photo.photoList[0].list) {
                markers[i].imgUrl = res.data.photo.photoList[0].list[0].orgurl ?? ''
              }
              setMarkers([...markers]);
            });
          }
        }
      });
  }

  const handleLogout = async () => {
    try {
      await supabase.supabase.auth.signOut(); // 해결~ ㄳㄳㄱㄳㅅㄳㅅㄳㄳ 하트
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };


  supabase.getSession().then((data) => setUserId(data.session.user.id));

  return (
    <div>
      <div className="navbar bg-base-100 mb-12">
        <div className="flex-1">
          <Link className="h-14 btn btn-ghost text-xl flex items-center justify-center" to={`/`}>
            <img className='w-14 h-14' src="/mumu.svg" />
            <h1 className='ml-4'>Pet Place</h1>
          </Link>
        </div>
        <div className="flex-none gap-2">
          {
            showSearchBar.showSearchBar && (
              <div className="flex space-x-2">
                <input type="text" placeholder="지역을 입력해주세요" className="input input-bordered w-32 md:w-auto" ref={searchRef} />
                <button className="btn w-18" onClick={fetchPlaces}>검색</button>
              </div>
            )
          }
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" />
              </div>
            </div>
            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
              <li>
                <Link className="justify-between" to={`/mypage/${userId}`}>
                  Mypage
                </Link>
              </li>
              <li><a onClick={handleLogout}>Logout</a></li>
            </ul>
          </div>
        </div>
      </div>
  </div>
  );
};

export default Header;
