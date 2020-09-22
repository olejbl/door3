import React, {useEffect} from 'react';
import styled from 'styled-components';
import { useDoor } from "./hooks";
import doors from "./doors.json";

const DisplayWrapper = styled.div`

`;

const Display = ({ doorHook }) => {
  const { selectedDoor, handleInput } = doorHook;
  return (
    <DisplayWrapper>
      <h2>Selected door:</h2>
      <p>{selectedDoor}</p>
    </DisplayWrapper>
  )
};

export {Display};