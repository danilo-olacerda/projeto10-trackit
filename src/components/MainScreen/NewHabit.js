import Days from "./Days";
import styled from "styled-components";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import axios from "axios";
import { useState } from "react";
import { ThreeDots } from  'react-loader-spinner';

export default function NewHabit({weekdays, setWeekdays, setAddNew, habitName, setHabitName, habits, setHabits}) {

    const [enable, setEnable] = useState(false);
    const {key} = useContext(UserContext);
    const days=[{day: "Domingo", dayNumber: 0}, {day: "Segunda", dayNumber: 1}, {day: "Terça", dayNumber: 2}, {day: "Quarta", dayNumber: 3}, {day: "Quinta", dayNumber: 4}, {day: "Sexta", dayNumber: 5}, {day: "Sábado", dayNumber: 6}];

    function saveNew () {
        if (weekdays.length===0)
        return;
        const config = {
            headers: {
                "Authorization": `Bearer ${key}`
            }
        }
        const body = {
            name: habitName,
            days: weekdays
        }
        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", body, config);
        setEnable(true);
        promise.then((info)=>{
            setHabits([...habits, info.data]);
            setAddNew(false);
            setWeekdays([]);
            setHabitName("");
            setEnable(false);
        });
    }

    return (
        <Container>

            <input type="text" disabled={enable} placeholder="nome do hábito" value={habitName} onChange={(e)=> setHabitName(e.target.value)}/>
            <Weekdays>
                {days.map((info, i) => <Days key={i} day={info.day} dayNumber={info.dayNumber} weekdays={weekdays} setWeekdays={setWeekdays} />)}
            </Weekdays>

            <HabitSave>
                <div></div>
                <span>
                    <CancelButton disabled={enable} onClick={() => setAddNew(false)}>Cancelar</CancelButton>
                    <SaveButton disabled={enable} onClick={saveNew}>{enable ? <ThreeDots color="#FFFFFF" height={20} width={50} /> : "Salvar"}</SaveButton>
                </span>
            </HabitSave>

        </Container>
    )
}

const Container=styled.div`
    width: 100%;
    background: #FFFFFF;
    border-radius: 5px;
    margin-bottom: 30px;
    padding: 18px;
    input {
        border: none;
        width: 100%;
        padding: 10px;
        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        margin-bottom: 8px;
    }
    input::placeholder {
        font-size: 18px;
        line-height: 25px;
        color: #DBDBDB;
    }
    button:disabled {
        opacity: 0.7;
    }
    input:disabled {
        color: #AFAFAF;
        background: #F2F2F2;
    }
`;
const Weekdays=styled.div`
    display: flex;
    margin-bottom: 30px;
`;
const HabitSave=styled.div`
    display: flex;
    justify-content: space-between;
    span {
        display: flex;
    }
`;
const SaveButton=styled.button`
    border: none;
    background: #52B6FF;
    border-radius: 4.63636px;
    font-size: 15.976px;
    line-height: 20px;
    text-align: center;
    color: #FFFFFF;
    padding: 7px 17px;
    margin-left: 18px;
`
const CancelButton=styled.button`
    background: #FFFFFF;
    border: none;
    font-size: 15.976px;
    line-height: 20px;
    text-align: center;
    color: #52B6FF;
`;