import { useEffect, useState } from "react";
import { getDoorsByProducer } from '../api';
import producers from '../data/producers.json';
import mainDoorLists from '../data/maindoorlists.json';

const useDoor = () => {
  const [producer, setProducer] = useState(producers[0]);
  const [mainDoorList, setMainDoorList] = useState(mainDoorLists[0]);
  const [doors, setDoors] = useState([]);
  const [selectedDoor, setSelectedDoor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedMainDoor, setSelectedMainDoor] = useState(null);
  const [mainDoors, setMainDoors] = useState ([]);
  const [background, setBackground] = useState(null);
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
