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

function getToday(config, setUserHabits, setCompleted) {
    const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config);
    promise.then((info) => {
        setUserHabits([...info.data]);
        let counter = 0;
        let numberOfHabits = info.data.length;
        for (let i = 0; i < info.data.length; i++) {
            if (info.data[i].done === true) {
                counter++;
            }
        }
        if (numberOfHabits!==0){
            setCompleted(counter / numberOfHabits);
        } else {
            setCompleted(0);
        }
    });
}

function Habit({ name, done, currentSequence, highestSequence, id, setCompleted, setUserHabits }) {

    const [selected, setSelected] = useState(done);
    const { key } = useContext(UserContext);

    function toggleSelect() {
        const config = {
            headers: {
                "Authorization": `Bearer ${key}`
            }
        }
        if (!selected) {
            setSelected(true);
            done = true;
            const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`, {}, config);
            promise.then(()=>{
                getToday(config, setUserHabits, setCompleted);
            });
        } else {
            setSelected(false);
            done = false;
            const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`, {}, config);
            promise.then(()=>{
                getToday(config, setUserHabits, setCompleted);
            });
        }
    }

    return (
        <HabitBox selected={selected} currentSequence={currentSequence} highestSequence={highestSequence}>
            <div>
                <p>{name}</p>
                <span>
                    <h3>Sequência atual: </h3><h4> {` ${currentSequence}`} dia(s)</h4>
                </span>
                <span>
                    <h3>Seu recorde: </h3><h4> {` ${highestSequence}`} dia(s)</h4>
                </span>
            </div>
            <span onClick={toggleSelect}>
                <img src={check} alt="" />
            </span>
        </HabitBox>
    )
}

export default function Today({ userphoto, setCompleted, completed}) {

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
        getToday(config, setUserHabits, setCompleted);
        setWeekday(day.format("dddd"));
        setDate(day.format("DD/MM"));

    }, []);

    return (
        <Container>
            <Top>
                <div>
                    <h2 onClick={() => console.log(userHabits)}>TrackIt</h2>
                    <img src={userphoto} alt="" />
                </div>
            </Top>

            <Habits>
                <HabitsDay>
                    <p>{weekday.charAt(0).toUpperCase() + weekday.slice(1)}, {date}</p>
                    {completed===0 ? <h4>Nenhum hábito concluído ainda</h4>: <h5>{parseInt(completed*100)}% dos hábitos concluídos</h5>}
                </HabitsDay>
                <MyHabits>
                    {userHabits[0] === 0 || userHabits[0]=== undefined ? <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p> :
                        userHabits.map((info, i) => <Habit setUserHabits={setUserHabits} setCompleted={setCompleted} userHabits={userHabits} key={i} id={info.id} name={info.name} done={info.done} currentSequence={info.currentSequence} highestSequence={info.highestSequence} />)}
                </MyHabits>
            </Habits>


            <Bottom>
                <p onClick={() => navigate("/habitos")}>Hábitos</p>
                <Link to="/hoje">
                    <CircularProgressbar value={completed * 100} text="Hoje" backgroundPadding={6} background styles={buildStyles(progressbarStyle)} />
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
    h5 {
        font-size: 17.976px;
        line-height: 22px;
        color: #8FC549;
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
    div span {
        display: flex;
    }
    p {
        font-size: 19.976px;
        line-height: 25px;
        color: #666666;
    }
    h3, h4 {
        word-wrap: break-word;
        font-size: 12.976px;
        line-height: 16px;
        color: #666666;
        margin-right: 3px;
    }
    h4 {
        margin-right: 0;
        color: ${props => props.highestSequence===props.currentSequence && props.currentSequence!==0 ? "#8FC549" : "#666666;"};
    }
    > span {
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