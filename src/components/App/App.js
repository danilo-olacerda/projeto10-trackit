import { BrowserRouter, Routes, Route } from "react-router-dom";
import {useState} from "react";
import UserContext from "../../contexts/UserContext";
import LoginScreen from '../LoginScreen/LoginScreen';
import RegisterScreen from "../RegisterScreen/RegisterScreen";
import MainScreen from "../MainScreen/MainScreen";

export default function App() {

  const [key, setKey] = useState(null);

  return (
  <BrowserRouter>
    <UserContext.Provider value={{key, setKey}}>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/cadastro" element={<RegisterScreen  />}/>
        <Route path="/habitos" element={<MainScreen />}/>
          {/* 
          <Route path="/sucesso" element={<Screen4 reserves={reserves} finalId={finalId} setReserves={setReserves} />}/> */}
      </Routes>
    </UserContext.Provider>
	</BrowserRouter>
  );
}