import logo from "../assets/logo.png"
import styled from "styled-components";
import {useState} from "react";
import {useContext} from "react";
import UserContext from "../../contexts/UserContext";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import {Link} from "react-router-dom";

export default function LoginScreen () {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [enable, setEnable] = useState(false);
    const {setKey} = useContext(UserContext);

    const navigate = useNavigate();

    function login(event){
        event.preventDefault();
        setEnable(true);
        const body = {
            email,
            password
        };
        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", body);
        promise
            .then((e)=>{
            setKey(e.data.token);
            navigate("/habitos");
        })
            .catch((e)=> {
            setEnable(false);
            setEmail("");
            setPassword("");
            alert("Email ou senha inválidos!");
            });
    }

    return (
        <Container enable={enable}>
            <img src={logo} alt=""/>
            <form action="submit" onSubmit={login}>
                <input type="email" disabled={enable} placeholder="email" value={email} onChange={e => setEmail(e.target.value)} required/>
                <input type="password" disabled={enable} placeholder="senha" value={password} onChange={e => setPassword(e.target.value)} required/>
                <button type="submit" disabled={enable}>{!enable ? "Entrar" : "Carregando"}</button>
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
    button:disabled {
        opacity: 0.7;
    }
    input:disabled {
        color: #AFAFAF;
        background: #F2F2F2;
    }
    p {
        font-size: 13.976px;
        line-height: 17px;
        text-align: center;
        text-decoration-line: underline;
        color: #52B6FF;
    }
    a {
        pointer-events: ${props => props.enable ? "none" : "initial"};
    }
`;