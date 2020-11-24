import React from 'react';
import styled from 'styled-components'

const RedactionalWrapper = styled.div`
 margin: 1em;
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
const RedactionalViewer = ({doorHook}) => {
  const {selectedDoor} = doorHook;
  return(
    <RedactionalWrapper doorHook={doorHook}>
      <p id="selectedDoorFormatted"> Du har valgt:  <b> {WordFormatter((selectedDoor.public_id))}</b> </p>
      <p> For å flytte på eksempeldøren, trykk på den nye døren og dra hvert hjørne over den gamle døren.</p>
      <p> For å vende om døren slik at du får dørhåndtaket på den andre siden, dra de to sirklene til venstre over til høyre side.</p>
    </RedactionalWrapper>
  );
}
export {RedactionalViewer};