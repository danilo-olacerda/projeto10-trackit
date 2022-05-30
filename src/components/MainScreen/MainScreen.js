import styled from "styled-components";
import addButton from "../assets/Rectangle 9.png";
import {CircularProgressbar, buildStyles} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {useNavigate} from 'react-router-dom';
import {useState, useEffect} from "react";
import NewHabit from "./NewHabit";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import axios from "axios";
import { Link } from "react-router-dom";
import Days from "./Days";
import trashcan from "../assets/trashcan.png";

function BoxHabit({taskdays, name, id, setHabits, habits, index}){

    const days=[{day: "Domingo", dayNumber: 0}, {day: "Segunda", dayNumber: 1}, {day: "Terça", dayNumber: 2}, {day: "Quarta", dayNumber: 3}, {day: "Quinta", dayNumber: 4}, {day: "Sexta", dayNumber: 5}, {day: "Sábado", dayNumber: 6}];
    const {key} = useContext(UserContext);

    function deleteHabit() {
        const config = {
            headers: {
                "Authorization": `Bearer ${key}`
            }
        }
        axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`, config);
        habits.splice(index, 1);
        setHabits([...habits]);
    }

    return (
        <HabitList>
            <div>
                <p>{name}</p>
                <img src={trashcan} alt="" onClick={deleteHabit}/>
            </div>
            <span>
                {days.map((info, i) => <Days key={i} day={info.day} dayNumber={info.dayNumber} taskdays={taskdays} />)}
            </span>
        </HabitList>
    )
}

export default function MainScreen({userphoto, completed}) {

    const navigate=useNavigate();
    const [habitName, setHabitName] = useState("");
    const [habits, setHabits] = useState([]);
    const [weekdays, setWeekdays] = useState([]);
    const [addNew, setAddNew] = useState(false);
    const {key} = useContext(UserContext);

    useEffect(()=>{
        const config = {
            headers: {
                "Authorization": `Bearer ${key}`
            }
        }
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config);
        promise.then((info)=> {
            setHabits(info.data);
        })
    },[]);

    return (
        <Container>
            <Top>
                <div>
                    <h2>TrackIt</h2>
                    <img src={userphoto} alt="" />
                </div>
            </Top>

            <Habits>
                <MyHabits>
                    <p>Meus hábitos</p>
                    <div onClick={() => setAddNew(true)}>
                        <img src={addButton} alt="" />
                        <h4>+</h4>
                    </div>
                </MyHabits>

                {addNew ? <NewHabit habits={habits} setHabits={setHabits} habitName={habitName} setHabitName={setHabitName} weekdays={weekdays} setWeekdays={setWeekdays} setAddNew={setAddNew} /> : <></>}



                {habits.length===0 ? <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p> : 
                habits.map((info, i)=> <BoxHabit habits={habits} setHabits={setHabits} key={i} name={info.name} taskdays={info.days} id={info.id} index={i} />)}
            </Habits>


            <Bottom>
                <p onClick={() => navigate("/habitos")}>Hábitos</p>
                <Link to="/hoje">
                    <CircularProgressbar value={completed*100} text="Hoje" backgroundPadding={6} background styles={buildStyles(progressbarStyle)}/>
                </Link>
                <p onClick={()=> navigate("/historico")}>Histórico</p>
            </Bottom>
        </Container>
    )
}
const Habits=styled.div`
    margin-top: 28px;
    > p {
        font-weight: 400;
        font-size: 17.976px;
        line-height: 22px;
        color: #666666;
    }
`;
const MyHabits=styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    p {
        font-size: 22.976px;
        line-height: 29px;
        color: #126BA5;
    }
    div {
        position: relative;
    }
    div h4 {
        font-size: 26.976px;
        line-height: 34px;
        text-align: center;
        color: #FFFFFF;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: -1px;
    }
`;
const Container=styled.div`
    padding-top: 70px;
    padding-right: 20px;
    padding-left: 20px;
    padding-bottom: 100px;
    background: #E5E5E5;
    min-height: 100%;
`;
const Top=styled.div`
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
        border-radius: 50%;
        width: 51px;
        height: 51px;
        object-fit: contain;
    }
`;
const Bottom=styled.div`
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
const progressbarStyle={
    backgroundColor: "#52B6FF",
    textColor: "#FFFFFF",
    pathColor: "#FFFFFF",
    trailColor: "transparent"
};
const HabitList=styled.div`
    margin-bottom: 10px;
    width: 100%;
    background: #FFFFFF;
    border-radius: 5px;
    padding: 15px;
    div {
        display: flex;
        justify-content: space-between;
        margin-bottom: 8px;
    }
    > div p {
        font-size: 19.976px;
        line-height: 25px;
        color: #666666;
    }
    > div img {
        width: 13px;
        height: 15px;
    }
    span {
        display: flex;
    }
    span div {
        align-items: center;
        justify-content: center;
    }
`;