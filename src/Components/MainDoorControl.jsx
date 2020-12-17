import React from "react";
import styled from "styled-components";
import { CloudinaryContext, Image } from "cloudinary-react";

import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css'

const ControlsWrapper = styled.div`
  z-index: 100;
  background-color: #ececec;
  min-height: 300px;
  /* max-height: 370px; */
  overflow-y: scroll;
  min-width: 900px;
  position: relative;
  margin-bottom: 2em;
`;

const DoorPicker = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  overflow-x: hidden;
  overflow-y: hidden;
  padding: 0em;
  width: 95%;
  margin: auto;
  background-color: #ececec;
  justify-content: center;
`;

const SingleDoor = styled.div`
  padding: 0.4em;
  width: 150px;
  transition: 0.2s;
  &:hover {
    transform: scale(1.05);
  }
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

  const handleDragStart = (e) => e.preventDefault();

  return (
    <CloudinaryContext cloudName="dikc1xnkv">
      <ControlsWrapper>
        <div>
          <b>Velg modell </b>
        </div>
        {/* <DoorPicker>
          {mainDoors.map((door) => {
            if (true) {
              return (
                <SingleDoor
                  key={door.public_id || door}
                  onClick={() => {
                    handleMainDoorChange(door); //selects the main door, then shows the rest of the corresponding doors
                  }}
                  onDragStart={handleDragStart} 
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
        </DoorPicker> */}
        <AliceCarousel
          mouseTrackings
          style={{width: 150}}>
          {mainDoors.map((door) => {
            if (true) {
              return (
                <SingleDoor
                  key={door.public_id || door}
                  onClick={() => {
                    handleMainDoorChange(door); //selects the main door, then shows the rest of the corresponding doors
                  }}
                  onDragStart={handleDragStart} 
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
        </AliceCarousel>
      </ControlsWrapper>
    </CloudinaryContext>
  );
};

export { MainDoorControl };
