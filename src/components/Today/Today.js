import styled from "styled-components";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import dayjs from "dayjs";
import 'dayjs/locale/pt-br';
import axios from "axios";
import check from "../assets/check.png"

function Habit({name, done, currentSequence, highestSequence, id}) {

    const [selected, setSelected] = useState(done);
    const { key } = useContext(UserContext);

    function toggleSelect () {
        const config = {
            headers: {
                "Authorization": `Bearer ${key}`
            }
        }
        if (!selected) {
            setSelected(true);
            
            axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`, {},config);
        } else {
            setSelected(false);
            
            axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`, {},config);
        }
    }

    return (
        <HabitBox selected={selected}>
            <div>
                <p>{name}</p>
                <h3>Sequência atual: {currentSequence} dia(s)</h3>
                <h3>Seu recorde: {highestSequence} dia(s)</h3>
            </div>
            <span onClick={toggleSelect}>
                <img src={check} alt="" />
            </span>
        </HabitBox>
    )
}

export default function Today({userphoto, setCompleted, completed}) {

    const navigate = useNavigate();
    const [userHabits, setUserHabits] = useState([0]);
    const { key } = useContext(UserContext);
    const [date, setDate] = useState("");
    const [weekday, setWeekday] = useState("");

    useEffect(() => {

        const day = dayjs().locale('pt-br');
        const config = {
            headers: {
                "Authorization": `Bearer ${key}`
            }
        }
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config);
        promise.then((info) => {
            setUserHabits(info.data);
        });
        
        setWeekday(day.format("dddd"));
        setDate(day.format("DD/MM"));

    }, []);

    return (
        <Container>
            <Top>
                <div>
                    <h2 onClick={()=> console.log(completed)}>TrackIt</h2>
                    <img src={userphoto} alt="" />
                </div>
            </Top>

            <Habits>
                <HabitsDay>
                    <p>{weekday.charAt(0).toUpperCase() + weekday.slice(1)}, {date}</p>
                    <h4>Nenhum hábito concluído ainda</h4>
                </HabitsDay>
                <MyHabits>
                    {userHabits[0] === 0 ? <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p> : 
                    userHabits.map((info, i)=> <Habit key={i} id={info.id} name={info.name} done={info.done} currentSequence={info.currentSequence} highestSequence={info.highestSequence}/>)}
                </MyHabits>
            </Habits>


            <Bottom>
                <p onClick={() => navigate("/habitos")}>Hábitos</p>
                <Link to="/hoje">
                    <CircularProgressbar value={completed*100} text="Hoje" backgroundPadding={6} background styles={buildStyles(progressbarStyle)} />
                </Link>
                <p onClick={() => navigate("/historico")}>Histórico</p>
            </Bottom>
        </Container>
    )
}

const Container = styled.div`
    padding-top: 70px;
    padding-right: 20px;
    padding-left: 20px;
    padding-bottom: 100px;
    background: #E5E5E5;
    min-height: 100%;
`;
const Top = styled.div`
    padding: 0 18px;
    width: 100%;
    height: 70px;
    background-color: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    position: fixed;
    left: 0;
    top: 0;
    div {
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    h2 {
        font-family: 'Playball';
        font-style: normal;
        font-weight: 400;
        font-size: 38.982px;
        line-height: 49px;
        color: #FFFFFF;
    }
    img {
        width: 51px;
        height: 51px;
        border-radius: 50%;
        object-fit: contain;
    }
`;
const Bottom = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 70px;
    background: #FFFFFF;
    p {
        font-size: 17.976px;
        line-height: 22px;
        text-align: center;
        color: #52B6FF;
    }
    svg {
        width: 91px;
        height: 91px;
        margin-bottom: 35px;
    }
`;
const progressbarStyle = {
    backgroundColor: "#52B6FF",
    textColor: "#FFFFFF",
    pathColor: "#FFFFFF",
    trailColor: "transparent"
};
const Habits = styled.div`
    margin-top: 28px;
    > p {
        font-weight: 400;
        font-size: 17.976px;
        line-height: 22px;
        color: #666666;
    }
`;
const HabitsDay = styled.div`
    margin-bottom: 30px;
    p {
        font-size: 22.976px;
        line-height: 29px;
        color: #126BA5;
    }
    h4 {
        font-size: 17.976px;
        line-height: 22px;
        color: #BABABA; //#8FC549
    }
`;
const MyHabits = styled.div`
    width: 100%;
`;
const HabitBox = styled.div`
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    padding: 13px 15px;
    width: 100%;
    background-color: #FFFFFF;
    border-radius: 5px;
    div {
        width: calc(100% - 69px);
    }
    p {
        font-size: 19.976px;
        line-height: 25px;
        color: #666666;
    }
    h3 {
        word-wrap: break-word;
        font-size: 12.976px;
        line-height: 16px;
        color: #666666;
    }
    span {
        width: 69px;
        height: 69px;
        background: ${props => props.selected ? "#8FC549" : "#EBEBEB"};
        border: 1px solid #E7E7E7;
        border-radius: 5px;
        position: relative;
        img {
            position: absolute;
            top: 20px;
            left: 17px;
        }
    }
`;