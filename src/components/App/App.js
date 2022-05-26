import { BrowserRouter, Routes, Route } from "react-router-dom";
import {useState} from "react";
import LoginScreen from '../LoginScreen/LoginScreen';
import RegisterScreen from "../RegisterScreen/RegisterScreen";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/cadastro" element={<RegisterScreen  />}/>
        {/* 
        <Route path="/sessao/:idSession" element={<Screen3 reserves={reserves} setReserves={setReserves} setFinalId={setFinalId} lastpage={lastpage}/>}/>
        <Route path="/sucesso" element={<Screen4 reserves={reserves} finalId={finalId} setReserves={setReserves} />}/> */}
      </Routes>
		</BrowserRouter>
  );
}