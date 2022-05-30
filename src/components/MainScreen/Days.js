import styled from "styled-components";
import { useState } from "react";

export default function Days({day, dayNumber, weekdays, setWeekdays, taskdays}) {

    const [selected, setSelected] = useState(false);

    function selectDay() {
        if (!selected) {
            setSelected(true);
            setWeekdays([...weekdays, dayNumber]);
        } else {
            setSelected(false);
            for (let i=0; i<weekdays.length; i++) {
                if (weekdays[i]===dayNumber){
                    weekdays.splice(i, 1);
                    weekdays.sort((a, b) => a - b);
                }
            }
        }
    }

    if (!taskdays){
        return (
            <Container selected={selected} onClick={selectDay}>
                <p>{day[0]}</p>
            </Container>
        )
    } else {
        return (
            <Container selected={taskdays.includes(dayNumber)}>
                <p>{day[0]}</p>
            </Container>
        )
    }
}

const Container=styled.div`
    width: 30px;
    height: 30px;
    background: ${props => !props.selected ? "#FFFFFF" : "#CFCFCF"};
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    margin-right: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    p {
        font-size: 19.976px;
        line-height: 25px;
        color: ${props => !props.selected ? "#DBDBDB" : "#FFFFFF"};
    }
`;