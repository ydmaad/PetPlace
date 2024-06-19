import React from 'react'
import Map from '../components/Map'
import Header from '../components/Header'
import Arrange from '../components/Arrange'
import List from '../components/List'
import MapProvider from '../provider/MapProvider'
import supabase from '../lib/Supabase'


function MainPage() {
  const [isLogin, setLogin] = React.useState(undefined)
  
  React.useEffect(() => {
    supabase.isSignIn().then((result) => {
      if (!result) window.location.href = '/login'
      setLogin(result)
    })
  }, [])

  if (isLogin === undefined) {
    return (<></>)
  }

  // 이미지, 가게 이름, 카테고리( 식당 / 카페 / 펜션 ), 지역 
  
  // 사용 가능한 목록:
  // - 장소 ID ㅇ
  // - 장소명, 업체명 ㅇ
  // - 카테고리 이름 ( 음식점 > 치킨 ) ㅇ
  // - 중요 카테고리만 그룹핑한 카테고리 그룹 코드 ( FD6 ) ㅇ
  // - 중요 카테고리만 그룹핑한 카테고리 그룹명 ( 음식점 ) ㅇ
  // - 전화번호 
  // - 전체 지번 주소 
  // - 전체 도로명 주소 ㅇ
  // - X 좌표값 혹은 longitude
  // - Y 좌표값 혹은 latitude
  // - 장소 상세페이지 URL
  // - 중심좌표까지의 거리(x,y 파라미터를 준 경우에만 존재). 단위 meter

  return (
    <MapProvider>
      <Header showSearchBar={true} />
      <Arrange />
      <div className="flex space-x-10">
        <Map geoLoc={false} />
        <List />
      </div>
    </MapProvider>
  )
}

export default MainPage
