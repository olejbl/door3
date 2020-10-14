import { useEffect, useState } from "react";
import { getDoorsByProducer } from '../api';
import producers from '../data/producers.json';
import mainDoorLists from '../data/maindoorlists.json';

const useDoor = () => {
  const [producer, setProducer] = useState(producers[0]);
  const [mainDoorList, setMainDoorList] = useState(mainDoorLists[0]);
  const [doors, setDoors] = useState([]);
  const [selectedDoor, setSelectedDoor] = useState({"public_id":"swedoor_debussy/Classic_Debussy_NCS_S_4050-Y80R_decor_1_prdggo","version":1601469857,"format":"jpg","width":713,"height":1500,"type":"upload","created_at":"2020-09-30T12:44:17Z"});
  const [loading, setLoading] = useState(false);
  const [selectedMainDoor, setSelectedMainDoor] = useState({"public_id":"swedoor_debussy/Classic_Debussy_NCS_S_4050-Y80R_decor_1_prdggo","version":1601469857,"format":"jpg","width":713,"height":1500,"type":"upload","created_at":"2020-09-30T12:44:17Z"});
  const [mainDoors, setMainDoors] = useState ([]);
  const [background, setBackground] = useState("https://res.cloudinary.com/dikc1xnkv/image/upload/eksempelbilde.jpg");
  const [select, setSelect] = useState("main");

  useEffect(() => {
    const fetchDoors = async () => {
      setLoading(true);
      try {
        await getDoorsByProducer(producer).then(res => {
          if (res.status === 200) {
            setDoors(res.data.resources);
          } else {
            // Handle error
            setDoors([]);
          }
        }) 
      } catch(err) {
        // TODO: Catch error
        setDoors([]);
      }
      setLoading(false);
    }
    if (!producer) return;
    fetchDoors();
  }, [producer])

  useEffect(() => {
    const fetchMainDoors = async () => {
      setLoading(true);
      try {
        await getDoorsByProducer(mainDoorList).then(res => {
          if (res.status === 200) {
            setMainDoors(res.data.resources);
          } else {
            // Handle error
            setMainDoors([]);
          }
        }) 
      } catch(err) {
        // TODO: Catch error
        setMainDoors([]);
      }
      setLoading(false);
    }
    if (!mainDoorList) return;
    fetchMainDoors();
  }, [mainDoorList])

  return {
    selectedDoor,
    setSelectedDoor,
    selectedMainDoor,
    mainDoors,
    setMainDoors,
    mainDoorList,
    setMainDoorList,
    setSelectedMainDoor,
    producer, 
    setProducer,
    doors,
    loading,
    background,
    setBackground,
    select,
    setSelect
  }
};
export {useDoor};
