import { BrowserRouter, Routes, Route } from "react-router-dom";
import {useState} from "react";
import UserContext from "../../contexts/UserContext";
import LoginScreen from '../LoginScreen/LoginScreen';
import RegisterScreen from "../RegisterScreen/RegisterScreen";
import MainScreen from "../MainScreen/MainScreen";
import History from "../History/History";
import Today from "../Today/Today";

export default function App() {

  const [key, setKey] = useState(null);
  const [userphoto, setUserPhoto] = useState("");
  const [completed, setCompleted] = useState(0);

  return (
  <BrowserRouter>
    <UserContext.Provider value={{key, setKey}}>
      <Routes>
        <Route path="/" element={<LoginScreen setUserPhoto={setUserPhoto} setCompleted={setCompleted} />} />
        <Route path="/cadastro" element={<RegisterScreen  />}/>
        <Route path="/habitos" element={<MainScreen userphoto={userphoto} completed={completed}/>}/>
        <Route path="/historico" element={<History userphoto={userphoto} completed={completed}/>}/>
        <Route path="/hoje" element={<Today userphoto={userphoto} setCompleted={setCompleted} completed={completed} />}/>
      </Routes>
    </UserContext.Provider>
	</BrowserRouter>
  );
}