import { useEffect, useState } from "react";
import { getDoorsByProducer } from '../api';
import producers from '../data/producers.json';

const useDoor = () => {
  const [producer, setProducer] = useState(producers[0]);
  const [doors, setDoors] = useState([]);
  const [selectedDoor, setSelectedDoor] = useState(null);
  const [loading, setLoading] = useState(false);

  const [background, setBackground] = useState(null);

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

  return {
    selectedDoor,
    setSelectedDoor,
    producer, 
    setProducer,
    doors,
    loading,
    background,
    setBackground
  }
};
export {useDoor};
