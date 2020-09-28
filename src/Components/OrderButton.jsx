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
  text-decoration: none;
  padding: 0.25em 1em;

`


const OrderLink = ({doorHook}) => {
  const { selectedDoor } = doorHook;
  const customLink = "https://www.ligaard.net/search?query=";
  if (selectedDoor == null) return(
    <p> </p>
  );
  else return (
    <div>
      <Button as="a" target="_blank" href={customLink + selectedDoor.public_id.split("/")[0]}>
          Bestill
      </Button>
    </div>
  );
  
}

export {OrderLink}
