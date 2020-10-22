import React from 'react';
import styled from 'styled-components';
import {CloudinaryContext, Image} from 'cloudinary-react';
import { Icon } from '@iconify/react';
import cameraFilled from '@iconify/icons-ant-design/camera-filled';

const ControlsWrapper = styled.div`
  z-index: 100;
  background-color:#E7E7E7;
  min-height: 300px;
`;
const ControlsWrapperSub = styled.div`
  z-index: 100;
  background-color:#E7E7E7;
  min-height: 100px;
  margin-top: 10em;
  margin-right: 1em;
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
  width: 15vw;
  margin: auto;
  background-color: #ECECEC;
`;

const SingleDoor = styled.div`
  padding: 0.4em;
  transition: 0.2s;
  &:hover {
    transform: scale(1.05);
  }
`;

const ImgUpload = styled.label`
  padding: 1em;
  border: 0.1em  #97262C dashed;
  background-color: #97262C;
  &:hover {
    transform: scale(1.05);
  }
  border-radius: 5px;
  display: block;
  font-weight: 700;
  width: 100px;
  height: 50px;
  margin: 30px auto;
  color: white;
  box-shadow: 0 1px 1px rgba(0,0,0,0.15);
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
    <div>
    <ImgUpload htmlFor="inpImage">
      <span> Last opp </span>
      <Icon icon={cameraFilled} style={{color: '#FFFFFF', fontSize: '40px', margin: 'auto', display:'block'}} />
      <input type="file" name="inpImage" id="inpImage" onChange={handleFileChange} style={{display:"none"}}/>
    </ImgUpload>
  </div>
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
        <b>Velg farge.  </b>
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