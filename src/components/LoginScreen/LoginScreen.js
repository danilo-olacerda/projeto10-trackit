import logo from "../assets/logo.png"
import styled from "styled-components";
import {useState} from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

export default function LoginScreen () {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function login(e){
        e.preventDefault();
    }

    return (
        <Container>
            <img src={logo} alt="" />
            <form action="submit" onSubmit={login}>
                <input type="email" placeholder="email" value={password} onChange={e => setPassword(e.target.value)} />
                <input type="password" placeholder="senha" value={email} onChange={e => setEmail(e.target.value)} />
                <button type="submit">Entrar</button>
            </form>

            <Link to="/cadastro">
                <p>Não tem uma conta? Cadastre-se!</p>
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