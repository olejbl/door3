import React from 'react'
import styled from 'styled-components'

const Button = styled.button `
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
  background-color: #058400;
  border-color: #058400;
  color: #fff;
  font-weight: 600;
  line-height: 37px;
  border-radius: 0px;
  width: 10em;
  text-decoration: none;
  &:hover {
    background-color: #148c44;
    border-color: #148c44;
  }

`
const ButtonContainer = styled.div`
  margin-top: 2em;
  margin-bottom: 3em;
  text-align: left;
  margin-left: 10em;
`
const OrderContainer = styled.div`
  text-align: left;
  margin-left: 10em;
`

const WordFormatter = (word) => {
  let result = word.split("/")[0]; // splits string on first "/""
  result = result.replace(/_/g, " "); // replaces "_" with whitespace
  result = result.split(' '); // split into array 
  result[0] = result[0].replace(/./,x=>x.toUpperCase()); //sets first letter of first word to uppercase
  result[1] = result[1].replace(/./,x=>x.toUpperCase()); //sets first letter of second word to uppercase
  result = Array.prototype.join.call(result, " "); //joins the pseudo-array
  return result;
}

const OrderText = ({doorHook}) => {
  const {selectedDoor} = doorHook;

  return(
    <OrderContainer>
      <p id="selectedDoorFormatted"> Du har valgt:  </p>
      <b> {WordFormatter((selectedDoor.public_id))}</b> 
    </OrderContainer>
  )
}

const OrderLink = ({doorHook}) => {
  const { selectedDoor } = doorHook;
  const customLink = "https://www.ligaard.net/search?query=";
  if (selectedDoor == null) return(
    <p> </p>
  );
  else return (
    <ButtonContainer>
      <Button as="a" target="_blank" href={customLink + selectedDoor.public_id.split("/")[0]}>
          Bestill
      </Button>
    </ButtonContainer>
  );
  
}

export {OrderLink, OrderText}
