import { Route, BrowserRouter, Routes } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import Mypage from './pages/MyPage';
import MainPage from './pages/MainPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/mypage/:userId' element={<Mypage/>} />
      </Routes>
    </BrowserRouter>
  )
}