import styled from "styled-components";
import picture from "../assets/Rectangle 14.png";
import addButton from "../assets/Rectangle 9.png";
import {CircularProgressbar, buildStyles} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {useState} from "react";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import axios from "axios";
import { Link } from "react-router-dom";

export default function MainScreen() {
    return (
        <Container>
            <Top>
                <div>
                    <h2>TrackIt</h2>
                    <img src={picture} alt="" />
                </div>
            </Top>


            <Habits>
                <MyHabits>
                    <p>Meus hábitos</p>
                    <div>
                        <img src={addButton} alt="" />
                        <h4>+</h4>
                    </div>
                </MyHabits>

                <NewHabit>
                    <input type="text" placeholder="nome do hábito" />
                    <Weekdays>
                        <div><p>D</p></div>
                        <div><p>S</p></div>
                        <div><p>T</p></div>
                        <div><p>Q</p></div>
                        <div><p>Q</p></div>
                        <div><p>S</p></div>
                        <div><p>S</p></div>
                    </Weekdays>
                    <HabitSave>
                        <div></div>
                        <span>
                            <div>Cancelar</div>
                            <li>Salvar</li>
                        </span>
                    </HabitSave>
                </NewHabit>
                <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
            </Habits>


            <Bottom>
                <p>Hábitos</p>
                <CircularProgressbar value="66" text="Hoje" backgroundPadding={6} background styles={buildStyles(progressbarStyle)}/>
                <p>Histórico</p>
            </Bottom>
        </Container>
    )
}
const HabitSave=styled.div`
    display: flex;
    justify-content: space-between;
    span {
        display: flex;
    }
`;
const NewHabit=styled.div`
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
`;
const Weekdays=styled.div`
    display: flex;
    margin-bottom: 30px;
    div {
        width: 30px;
        height: 30px;
        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        margin-right: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    div p {
        font-size: 19.976px;
        line-height: 25px;
        color: #DBDBDB;
    }
`
const Habits=styled.div`
    margin-top: 28px;
    p {
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
    background: #E5E5E5;
    height: 100%;
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
        width: 51px;
        height: 51px;
        border: 50%;
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