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
  background-color: #18aa53;
  border-color: #18aa53;
  color: #fff;
  font-weight: 600;
  line-height: 37px;
  border-radius: 4px;
  width: unset;
  text-decoration: none;
  &:hover {
    background-color: #148c44;
    border-color: #148c44;
  }

`
const ButtonContainer = styled.div`
  margin-top: 2em;
  margin-bottom: 3em;
`


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

export {OrderLink}
