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
  margin-top: 0em;
  margin-right: 1em;
  width: 100%;
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
  background-color: #ECECEC;
  justify-content: center;
`;

const SingleDoor = styled.div`
  padding: 0.4em;
  transition: 0.2s;
  &:hover {
    transform: scale(1.05);
  }
`;

const ImgUpload = styled.label`
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  border-spacing: 0;
  border-collapse: collapse;
  box-sizing: border-box;
  margin: 0;
  font: inherit;
  overflow: visible;
  text-transform: none;
  font-family: inherit;
  display: inline-block;
  padding: 6px 12px;
  margin-bottom: 0;
  font-size: 14px;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  touch-action: manipulation;
  cursor: pointer;
  user-select: none;
  background-image: none;
  border: 1px solid transparent;
  transition: all ease 250ms;
  letter-spacing: 1px;
  box-shadow: 0 1px 1px rgba(0,0,0,0.15);
  background-color: #97262C;
  border-color: #97262C;
  color: #fff;
  font-weight: 600;
  line-height: 37px;
  border-radius: 4px;
  width: 60%;
  /* padding: 1em;
  border: 0.1em  #97262C dashed;
  background-color: #97262C;
  &:hover {
    transform: scale(1.05);
  }
  border-radius: 5px;
  display: block;
  font-weight: bold;
  letter-spacing: 1px;
  width: 100px;
  height: 50px;
  margin: 30px auto;
  transition: all ease 250ms;
  color: white;
  box-shadow: 0 1px 1px rgba(0,0,0,0.15);; */
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
    <div style={{backgroundColor: '#ECECEC', width:'400px'}}>
      <div style={{padding: '1em'}}>
      <b>Last opp et bilde av ditt inngangsparti ved å klikke på kameraet </b>
      <p> For best resultater, ta bildet i godt sollys. Du bør ta bildet i liggende format.</p>
      <p> Tips: Skal du ha en annen størrelse på døren enn det du allerede har?  
      Mål opp og teip slik at det blir lettere å posisjonere døren riktig. Ønsker du en spesialfarge, kan du velge det i nettbutikken.</p>
      </div>
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