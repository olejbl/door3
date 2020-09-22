import React from 'react';
import styled from 'styled-components';
import producers from '../data/producers';
import {CloudinaryContext, Image} from 'cloudinary-react';

const ControlsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const DoorPicker = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  overflow-y:hidden;
  padding: 0.5em;
  width: 100%;
`;
const SingleDoor = styled.div`
  padding: 0.4em;
  transition: 0.2s;
  &:hover {
    transform: scale(1.05);
  }
`;

const ImgUpload = styled.label`
  padding: 4em;
  border: 0.5em lightgray dashed;
  border-radius: 1em;
  display: block;
  margin: 0.5em;
`;

const Controls = ({ doorHook }) => {
  const { setProducer, producer, doors, setSelectedDoor, loading, setBackground } = doorHook;

  const handleProducerChange = (evt) => {
    const { target: { value } } = evt;
    setProducer(value);
  }
  const handleFileChange = (evt) => {
    let reader = new FileReader();
    reader.onloadend = () => {
      setBackground(reader.result);
    }
    reader.readAsDataURL(evt.target.files[0]);
  }
  
  return (
    <CloudinaryContext cloudName="dikc1xnkv">
    <ControlsWrapper>
      <div>
        <ImgUpload htmlFor="inpImage">
          <input type="file" name="inpImage" id="inpImage" onChange={handleFileChange}/>
        </ImgUpload>
      </div>
      <div>
        <label htmlFor="inpProducers">Please select a producer</label>
        <select name="inpProducers" id="inpProducers" onChange={handleProducerChange}>
          { producers.map((prod) => (
            <option key={prod} value={prod}>{prod}</option>
          ))}
        </select>
      </div>
      { loading ? (
        <p>Loading ...</p>
      ) : (
        <DoorPicker>
        { doors.map((door) => (
          <SingleDoor key={door.public_id} onClick={() => setSelectedDoor(door)}>
            <Image publicId={door.public_id} height="200" dpr="auto" responsiveloading="lazy" quality="auto" controls />
          </SingleDoor>
        ))}
      </DoorPicker>
      )}
    </ControlsWrapper>
    </CloudinaryContext>
  )
};

export {Controls};