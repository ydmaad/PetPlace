import React from 'react'
import Arrange from '../components/Arrange'
import Header from '../components/Header'
import supabase from '../lib/Supabase';

const MyPage = () => {
  const [userEmail, setUserEmail] = React.useState('');
  supabase.getSession().then((data) => setUserEmail(data.session.user.email));
  return (
<>
  <Header showSearchBar={false} />
  <div className="flex justify-center items-center w-full">
    <div className="w-4/5">
      <div className="flex flex-col justify-center items-center w-full">
            <h3 className="text-2xl font-semibold mt-3">User Email: {userEmail}</h3>
      </div>
      <div className="my-5 border-2 border-indigo-600 p-4">
        <div className='flex text-center'>
          <h3 className='text-3xl font-bold mr-6'>북마크 장소</h3>
          <Arrange />
        </div>
        <div>북마크 장소 목록</div>
      </div>
    </div>
  </div>
</>
  )
}

export default MyPage