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

// const Button = styled.button `
//   width: 160px ;
//   height: 100px;
//   background-color: #97262C;
//   border-radius: 3px;
//   color: white;
//   font-family: Lato;
//   font-size: 36px;
//   font-style: normal;
//   font-weight: 700;
//   text-decoration: none;
//   margin: auto;
//   padding: 0.25em 1em;
  
// `


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
  const { setProducer, doors, setSelectedDoor, loading } = doorHook;

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

const MainDoorControl = ({doorHook}) => {
  const { setProducer, setSelectedMainDoor, loading, setSelectedDoor, mainDoors } = doorHook;

  const handleMainDoorChange = (door) => {
    setSelectedMainDoor(door);
    setSelectedDoor(door)
    const value = (door.public_id).split("/")[0].split("_")[1];
    //setMainDoor(value);
    setProducer(value);
  }

  return(
    <CloudinaryContext cloudName="dikc1xnkv">
    <ControlsWrapper>
      <div>
        <b>Velg dørmodell, du kan velge farge senere.  </b>
        {/* <div name="filters" id="filters" >
        <select name="inpProducers" id="inpProducers" onChange={""}>
          { mainDoorLists.map((main) => ( //TODO Filters here 
            <option key={main} value={main}>{main}</option>
          ))}
        </select>
        </div> */}
      </div>
      { loading ? (
        <p>Laster inn dører ...</p>
      ) : (
        <DoorPicker>
        { mainDoors.map((door) => {   
          if (true){
              return (
                <SingleDoor key={door.public_id} onClick={() => { 
                  handleMainDoorChange(door) //selects the main door, then shows the rest of the corresponding doors
                }
                }>
                  <Image publicId={door.public_id} height="150" width="75" dpr="auto" loading="lazy" quality="auto" controls />
                </SingleDoor>
                )
          }
        })
        }
        </DoorPicker>
        )}
    </ControlsWrapper>
    </CloudinaryContext>
  )
}

export { Controls, MainDoorControl, ImageUploader};