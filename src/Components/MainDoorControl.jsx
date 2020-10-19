import React from "react";
import styled from "styled-components";
import { CloudinaryContext, Image } from "cloudinary-react";

const ControlsWrapper = styled.div`
  z-index: 100;
  background-color: #e7e7e7;
  min-height: 300px;
  max-height: 400px;
  overflow-y: scroll;
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
`;

const SingleDoor = styled.div`
  padding: 0.4em;
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

  const handleMainDoorChange = (door) => {
    setSelectedMainDoor(door);
    setSelectedDoor(door);
    const value = door.public_id.split("/")[0].split("_")[1];
    //setMainDoor(value);
    setProducer(value);
  };

  return (
    <CloudinaryContext cloudName="dikc1xnkv">
      <ControlsWrapper>
        <div>
          <b>Velg dørmodell, du kan velge farge senere. </b>
          {/* <div name="filters" id="filters" >
        <select name="inpProducers" id="inpProducers" onChange={""}>
          { mainDoorLists.map((main) => ( //TODO Filters here 
            <option key={main} value={main}>{main}</option>
          ))}
        </select>
        </div> */}
        </div>
        <DoorPicker>
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
