import React from 'react';
import styled from 'styled-components';
import producers from '../data/producers';
import {CloudinaryContext, Image} from 'cloudinary-react';
import { Icon, InlineIcon } from '@iconify/react';
import cameraFilled from '@iconify/icons-ant-design/camera-filled';

const ControlsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 100;
  background-color:#E7E7E7;
`;

const DoorPicker = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  overflow-y:hidden;
  padding: 0.5em;
  width: 95vw;
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
  border-radius: 6px;
  display: block;
  width: 100px;
  height: 50px;
  margin: 50px auto;
  font-size: 20 px;
  color: white;
`;


const Controls = ({ doorHook }) => {
  const { setProducer, producer, doors, setSelectedDoor, loading, setBackground } = doorHook;

  const handleProducerChange = (evt) => {
    const { target: { value } } = evt;
    setProducer(value);
  }
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
    <CloudinaryContext cloudName="dikc1xnkv">
    <ControlsWrapper>
      <div>
          <h3>Last opp et bilde av ditt inngangsparti ved å klikke på kameraet </h3>
        <ImgUpload htmlFor="inpImage">
          <Icon icon={cameraFilled} style={{color: '#FFFFFF', fontSize: '70px'}} />
          <input type="file" name="inpImage" id="inpImage" onChange={handleFileChange} style={{display:"none"}}/>
        </ImgUpload>
      </div>
      <div>
        <label htmlFor="inpProducers">Velg produsent </label>
        <select name="inpProducers" id="inpProducers" onChange={handleProducerChange}>
          { producers.map((prod) => (
            <option key={prod} value={prod}>{prod}</option>
          ))}
        </select>
      </div>
      { loading ? (
        <p>Laster inn dører ...</p>
      ) : (
        <DoorPicker>
        { doors.map((door) => (
          <SingleDoor key={door.public_id} onClick={() => setSelectedDoor(door)}>
            <Image publicId={door.public_id} height="200" dpr="auto" loading="lazy" quality="auto" controls />
          </SingleDoor>
        ))}
        </DoorPicker>
      )}
    </ControlsWrapper>
    </CloudinaryContext>
  )
};

export {Controls};