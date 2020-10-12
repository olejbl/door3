import React from 'react';
import styled from 'styled-components';
import producers from '../data/producers';
import mainDoorLists from '../data/maindoorlists';
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
  overflow-x: scroll;
  overflow-y:hidden;
  padding: 0em;
  width: 95%;
  margin: auto;
  background-color: #ECECEC;
`;

const MainDoorPreviewer = styled.div`

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
      <h3>Last opp et bilde av ditt inngangsparti ved å klikke på kameraet </h3>
      <p> For best resultater, ta bildet i godt sollys. Du bør ta bildet i liggende format.</p>
      <p> Tips: Skal du ha en annen størrelse på døren enn det du allerede har?  
          Mål opp og teip slik at det blir lettere å posisjonere døren riktig.</p>

    <ImgUpload htmlFor="inpImage">
      <Icon icon={cameraFilled} style={{color: '#FFFFFF', fontSize: '60px', margin: 'auto', display:'block'}} />
      <input type="file" name="inpImage" id="inpImage" onChange={handleFileChange} style={{display:"none"}}/>
    </ImgUpload>
  </div>
  )
};

const Controls = ({ doorHook }) => {
  const { setProducer, producer, doors, setSelectedDoor, loading, setBackground } = doorHook;

  const handleProducerChange = (evt) => {
    const { target: { value } } = evt;
    setProducer(value);
  }
  return (
    <CloudinaryContext cloudName="dikc1xnkv">
    <ControlsWrapper>
      
      <div>
        <label htmlFor="inpProducers">Velg produsent:  </label>
        <select name="inpProducers" id="inpProducers" onChange={handleProducerChange}>
          { producers.map((prod) => (
            <option key={prod} value={prod}>{prod}</option>
          ))}
        </select>
      </div>
      { loading ? (
        <p>Laster inn dører ...</p>
      ) : (
        <SubDoorPicker id="subDoors">
        { doors.map((door) => (
          <SingleDoor key={door.public_id} onClick={() => setSelectedDoor(door)}>
            <Image publicId={door.public_id} height="150" width="75" dpr="auto" loading="lazy" quality="auto" controls />
          </SingleDoor>
        ))}
        </SubDoorPicker>
      )}
    </ControlsWrapper>
    </CloudinaryContext>
  )
};

const MainDoorControl = ({doorHook}) => {
  const { setProducer, selectedMainDoor, doors, setSelectedMainDoor, loading, setMainDoor, mainDoors } = doorHook;

  const handleMainDoorChange = (door) => {
    setSelectedMainDoor(door);
    const value = (door.public_id).split("/")[0].split("_")[1];
    //setMainDoor(value);
    setProducer(value);
  }

  return(
    <CloudinaryContext cloudName="dikc1xnkv">
    <ControlsWrapper>
      <div>
        <label htmlFor="inpProducers">Velg produsent:  </label>
        <select name="inpProducers" id="inpProducers" >
          { mainDoorLists.map((main) => ( //TODO Filters here 
            <option key={main} value={main}>{main}</option>
          ))}
        </select>
      </div>
      { loading ? (
        <p>Laster inn dører ...</p>
      ) : (
        <DoorPicker>
        { mainDoors.map((door) => { //TODO setSelected Main Door, chooses "producer" in controls.
          if (true){  //checks that the image has a alt-text named main
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