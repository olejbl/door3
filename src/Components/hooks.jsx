import doors from './doors.json';
import {useState} from "react";

const useDoor = () => {
  const [selectedDoor, setSelectedDoor] = useState(doors[1].id);
  return {
    selectedDoor,
    handleInput: (event) =>  {
      const { target: { value } } = event;
      setSelectedDoor(value);
    }
  }
};
export {useDoor};