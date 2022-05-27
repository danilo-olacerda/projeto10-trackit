import logo from "../assets/logo.png"
import styled from "styled-components";
import {useState} from "react";
import {useNavigate} from 'react-router-dom';
import { Link } from "react-router-dom";
import axios from "axios";

export default function RegisterScreen () {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [photo, setPhoto] = useState("");

    const navigate = useNavigate();

    function register(e){
        e.preventDefault();
        const body = {
            email,
            name,
            image: photo,
            password
        };
        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up", body);
        promise.then(()=> navigate("/"));
    }

    return (
        <Container>
            <img src={logo} alt="" />
            <form action="submit" onSubmit={register}>
                <input type="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} required/>
                <input type="password" placeholder="senha" value={password} onChange={e => setPassword(e.target.value)} required/>
                <input type="text" placeholder="nome" value={name} onChange={e => setName(e.target.value)} required/>
                <input type="url" placeholder="foto" value={photo} onChange={e => setPhoto(e.target.value)} required/>
                <button type="submit">Cadastrar</button>
            </form>

            <Link to="/">
                <p>Já tem uma conta? Faça login!</p>
            </Link>
            
        </Container>
    )
}

const Container = styled.div`
	width: 100%;
	height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    img {
        width: 189px;
        height: 179px;
        margin-bottom: 40px;
    }
    form {
        width: 80%;
        display: flex;
        flex-direction: column;
        margin-bottom: 25px;
    }
    input {
        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        padding: 9px 11px;
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
        margin-bottom: 6px;
    }
    input::placeholder {
        color: #DBDBDB;
    }
    button {
        padding: 8px 0;
        font-size: 20.976px;
        line-height: 26px;
        text-align: center;
        color: #FFFFFF;
        border: none;
        background: #52B6FF;
        border-radius: 4.63636px;
    }
    p {
        font-size: 13.976px;
        line-height: 17px;
        text-align: center;
        text-decoration-line: underline;
        color: #52B6FF;
    }
`;