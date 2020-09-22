import React, {useEffect} from 'react';
import styled from 'styled-components';
import { useDoor } from "./hooks";

const DisplayWrapper = styled.div`

`;

const Display = ({ doorHook }) => {
  const { selectedDoor, background } = doorHook;
  
  if (!selectedDoor) return (
    <p>Please select a door.</p>
  );

  if (!background) return (
    <p>No background image selected!</p>
  );

  return (
    <DoorPreviewer doorHook={doorHook}/>
  )
};

const DoorPreviewBackground = styled.div`
  background-image: url(${props => props.bg});
  background-size: cover;
  background-position: center;
  width: 900px;
  height: 500px;
`;

const DoorPreviewer = ({doorHook}) => {
  const {background} = doorHook;
  return (
    <DoorPreviewBackground bg={background}>

    </DoorPreviewBackground>
  );
}

export {Display};