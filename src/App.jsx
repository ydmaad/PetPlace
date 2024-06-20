import { Route, BrowserRouter, Routes } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import Mypage from './pages/MyPage';
import MainPage from './pages/MainPage';
import MapProvider from './provider/MapProvider';

import queryClient from "./react-query/queryClient.js";
import {QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MapProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/mypage/:userId' element={<Mypage/>} />
          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools />
      </MapProvider>
    </QueryClientProvider>
  )
}