import { useEffect, useState } from "react";
import doors from './doors.json';
import { getDoorsByProducer } from '../api';

const useDoor = () => {
  const [producer, setProducer] = useState(null);
  const [doors, setDoors] = useState([]);
  const [selectedDoor, setSelectedDoor] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDoors = async () => {
      setLoading(true);
      try {
        await getDoorsByProducer(producer).then(res => {
          console.log(res);
        }) 
      } catch(err) {
        // TODO: Catch error
      }
      setLoading(false);
    }
    if (!producer) return;
    fetchDoors();
  }, [producer])

  return {
    selectedDoor,
    setSelectedDoor,
    producer, 
    setProducer,
    doors,
    handleInput: (event) =>  {
      const { target: { value } } = event;
      setSelectedDoor(value);
    }
  }
};
export {useDoor};
