import React from "react";
import styled from "styled-components";
import { CloudinaryContext, Image } from "cloudinary-react";

const ControlsWrapper = styled.div`
  z-index: 100;
  background-color: #ececec;
  /* min-height: 300px; */
  /* max-height: 370px; */
  overflow-y: hidden;
  min-width: 900px;
  position: relative;
  margin-bottom: 1rem;

    /* Scrollbar style for Chrome */

  /* Track */
  #doorPicker::-webkit-scrollbar
  {
    width: 2em;
    height: 2em;
  }

  #doorPicker::-webkit-scrollbar-track
  {
    background: no-repeat #cecece;
    background-size
    border: solid 2px rgba(33,33,33,0.5);
  }


  /* Thumb */
  #doorPicker::-webkit-scrollbar-thumb
  {
    background: #97262c;
  }

  #doorPicker::-webkit-scrollbar-thumb:hover
  {
    background: #505050;
  }

  #doorPicker::-webkit-scrollbar-thumb:active
  {
    background: #404040;
  }

  /* #doorPicker::-webkit-scrollbar-thumb:horizontal
  {
    border-right: solid 2px rgba(33,33,33,0.5);
    border-left: solid 2px rgba(33,33,33,0.5);
  } */


  /* Buttons 
  #doorPicker::-webkit-scrollbar-button
  {
    border-style: solid;
    height: 55px;
    width: 55px;
  } */

  /* Left
  #doorPicker::-webkit-scrollbar-button:horizontal:decrement
  {
    border-width: 1rem 2rem 1rem 0;
    border-color: transparent #97262c transparent #404040;
  }

  #doorPicker::-webkit-scrollbar-button:horizontal:decrement:hover
  {
    border-color: transparent #505050 transparent transparent;
  }


  Right 
  #doorPicker::-webkit-scrollbar-button:horizontal:increment
  {
    border-width: 1rem 0rem 1rem 2rem;
    border-color: transparent transparent transparent #97262c;
  }

  #doorPicker::-webkit-scrollbar-button:horizontal:increment:hover
  {
    border-color: transparent transparent transparent #505050;
  }
  */
`;

const DoorPicker = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 0em;
  width: 900px;
  margin: auto;
  background-color: #ececec;
  justify-content: left;
`;

const SingleDoor = styled.div`
  padding: 0.4em;
  transition: 0.2s;
  &:hover {
    transform: scale(1.05);
  }
`;

const Header = styled.div`
  margin: 1rem 1rem 1rem 1.5rem;
  font-weight: 500;
`;


const MainDoorControl = ({ doorHook }) => {
  const {
    setProducer,
    setSelectedMainDoor,
    loading,
    setSelectedDoor,
    mainDoors,
  } = doorHook;

  const getDoorValue = (door) => {
    if (door.hasOwnProperty("public.id")) {
      return door.public_id.split("/")[0].split("_")[1];
    } else {
      return door.split("/")[0].split("_")[1];
    }
  };

  const handleMainDoorChange = (door) => {
    setSelectedMainDoor(door);
    setSelectedDoor(door);
    const value = door.public_id.split("/")[0].split("_")[1];
    setProducer(value);
  };


  return (
    <CloudinaryContext cloudName="dikc1xnkv">
      <ControlsWrapper>
        <Header>
          Dørvelgeren: Velg modell
        </Header>
        <DoorPicker id="doorPicker">
          {mainDoors.map((door) => {
            if (true) {
              return (
                <SingleDoor
                  key={door.public_id || door}
                  onClick={() => {
                    handleMainDoorChange(door); //selects the main door, then shows the rest of the corresponding doors
                  }}
                >
                  <Image
                    publicId={door.public_id || door}
                    height="150"
                    width="75"
                    dpr="auto"
                    loading="lazy"
                    quality="auto"
                    controls
                  />
                </SingleDoor>
              );
            }
          })}
        </DoorPicker>
      </ControlsWrapper>
    </CloudinaryContext>
  );
};

export { MainDoorControl };
