import React from 'react'
import styled from 'styled-components'

const Button = styled.button `
  width: 160px ;
  height: 100px;
  background-color: #97262C;
  border-radius: 3px;
  color: white;
  font-family: Lato;
  font-size: 36px;
  font-style: normal;
  font-weight: 700;

`


const OrderLink = ({doorHook}) => {
  const { selectedDoor } = doorHook;
  if (selectedDoor == null) return(
    <p> </p>
  );
  else return (
    <div>
      <Button href="www.vg.no"
        onClick={(e) => {
          console.log(selectedDoor.public_id)
        }}>
          Bestill
      </Button>
    </div>
  );
  
}

export {OrderLink}
