import React from 'react';
import styled from 'styled-components';
import doors from './doors.json';
import {useDoor} from "./hooks";

const ControlsWrapper = styled.div`

`;

const Controls = ({ doorHook }) => {
  const { selectedDoor, handleInput } = doorHook;
  return (
    <ControlsWrapper>
      <h1>Doors to pick</h1>
      { doors.map(door =>
        <div>
          <label htmlFor={door.id}>{door.label}</label>
          <input type="radio" value={door.id} name="doorRadio"
                 onChange={handleInput}
                 checked={door.id === selectedDoor}
          />
        </div>
      )}
    </ControlsWrapper>
  )
};

export {Controls};