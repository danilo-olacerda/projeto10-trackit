import styled from "styled-components";
import {CircularProgressbar, buildStyles} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {useNavigate} from 'react-router-dom';
import { Link } from "react-router-dom";

export default function History({userphoto, completed}) {

    const navigate=useNavigate();

    return (
        <Container>
            <Top>
                <div>
                    <h2>TrackIt</h2>
                    <img src={userphoto} alt="" />
                </div>
            </Top>


            <NewHistory>
                <MyHistory>
                    <p>Histórico</p>
                    <div>
                    </div>
                </MyHistory>

                <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>
            </NewHistory>


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
const NewHistory = styled.div`
    margin-top: 28px;
    > p {
        font-weight: 400;
        font-size: 17.976px;
        line-height: 22px;
        color: #666666;
    }
`;
const MyHistory = styled.div`
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
const Container = styled.div`
    padding-top: 70px;
    padding-right: 20px;
    padding-left: 20px;
    background: #E5E5E5;
    height: 100%;
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