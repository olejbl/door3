import React from 'react';
import styled from 'styled-components';
import {CloudinaryContext, Image} from 'cloudinary-react';
import { Icon } from '@iconify/react';
import camera from '@iconify/icons-ant-design/camera';

const ControlsWrapper = styled.div`
  z-index: 100;
  background-color:#ffffff;
  min-height: 300px;
`;
const ControlsWrapperSub = styled.div`
  z-index: 100;
  background-color:#ffffff;
  min-height: 100px;
  margin-top: 0em;
  margin-right: 1em;
  width: 100%;
  text-align: left;
`;

const DoorPicker = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  overflow-x: scroll;
  overflow-y:hidden;
  padding: 0em;
  width: 95%;
  margin: auto;
  background-color: #ECECEC;
`;

const SubDoorPicker = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  overflow-x: hidden;
  overflow-y:hidden;
  padding: 0em;
  margin: auto;
  background-color: #ffffff;
  justify-content: left;
`;

const SingleDoor = styled.div`
  padding: 0.4em;
  transition: 0.2s;
  &:hover {
    transform: scale(1.05);
  }
`;

const UploaderWrapper = styled.div`
  text-align: center;
  align-content: center;
`;

const ImgUpload = styled.label`
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  border-spacing: 0;
  border-collapse: collapse;
  box-sizing: border-box;
  margin: 0;
  overflow: visible;
  text-transform: none;
  display: flex;
  flex-direction: column;
  white-space: wrap;
  padding: 6px 12px;
  margin-block-end: 0.5em;
  font-size: 14px;
  text-align: center;
  vertical-align: middle;
  touch-action: manipulation;
  cursor: pointer;
  user-select: none;
  background-image: none;
  border: 1px solid transparent;
  transition: all ease 250ms;
  letter-spacing: 1px;
  box-shadow: 0 1px 1px rgba(0,0,0,0.15);
  background-color: #8b3030;
  border-color: #8b3030;
  color: #fff;
  font-weight: 400;
  border-radius: 0px;
  width: 300px;
  text-decoration: none;
  &:hover {
    background-color: #97262C;
    border-color: #97262C;
  }
`;



const ImageUploader = ({ doorHook }) => {
    const { setBackground } = doorHook;
    //Image uploader
    const handleFileChange = (evt) => {
    let reader = new FileReader();
    reader.onloadend = () => {
      setBackground(reader.result);
    }
    reader.readAsDataURL(evt.target.files[0]);
    //consider using e_improve:[mode]:[blend] - mode: `outdoor` with cloudinary
  }
  return (
    <UploaderWrapper>
      <ImgUpload htmlFor="inpImage">
        <Icon icon={camera} style={{color: '#FFFFFF', fontSize: '35px', margin: 'auto', display:'block'}}/>
        <span> </span>
        <p style={{fontSize: '20px'}}>Klikk her for å laste opp eget bilde </p>
        <p> For best resultater, ta bildet i godt sollys. Du bør ta bildet i liggende format.</p>
        <input type="file" name="inpImage" id="inpImage" onChange={handleFileChange} style={{display:"none"}}/>
      </ImgUpload>
      <h4>Velg type</h4> 
    </UploaderWrapper>
  )
};

const Controls = ({ doorHook }) => {
  const { doors, setSelectedDoor, loading } = doorHook;

  // const handleProducerChange = (evt) => {
  //   const { target: { value } } = evt;
  //   setProducer(value);
  // }
  return (
    <CloudinaryContext cloudName="dikc1xnkv">
    <ControlsWrapperSub>
      
      <div>
        <h4>Velg farge  </h4>
      </div>
      { loading ? (
        <p>Laster inn dører ...</p>
      ) : (
        <SubDoorPicker id="subDoors">
        { doors.map((door) => (
          <SingleDoor key={door.public_id} onClick={() => setSelectedDoor(door)}>
            <Image publicId={door.public_id} height="100" width="50" dpr="auto" loading="lazy" quality="auto" controls />
          </SingleDoor>
        ))}
        </SubDoorPicker>
      )}
    </ControlsWrapperSub>
    </CloudinaryContext>
  )
};

export { Controls, ImageUploader};