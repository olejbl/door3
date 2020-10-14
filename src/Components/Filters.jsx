import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: auto;
  width: 100%;
  padding: 0px 16px 24px 16px;
  box-sizing: border-box;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  height: 48px;
  position: relative;
  border: 1px solid #ccc;
  box-sizing: border-box;
  border-radius: 2px;
  margin-bottom: 10px;
  background: white;
  ${props =>
    props.active &&
    `
    box-shadow: 0 0 10px -4px black;
  `}
`;

const RadioButtonLabel = styled.label`
  position: absolute;
  top: 25%;
  left: 4px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: white;
  border: 1px solid #ccc;
`;
const RadioButton = styled.input`
  opacity: 0;
  z-index: 1;
  cursor: pointer;
  width: 25px;
  height: 25px;
  margin-right: 10px;
  &:hover ~ ${RadioButtonLabel} {
    background: #ccc;
    &::after {
      display: block;
      color: white;
      width: 12px;
      height: 12px;
      margin: 4px;
    }
  }
  &:checked + ${Item} {
    background: #2c9726;
    border: 2px solid #2c9726;
  }
  &:checked + ${RadioButtonLabel} {
    background: #2c9726;
    border: 1px solid #2c9726;
    &::after {
      display: block;
      color: white;
      width: 12px;
      height: 12px;
      margin: 4px;
    }
  }
`;

const Filters = ({doorHook}) => {
  const { setMainDoorList, select, setSelect } = doorHook;
  // TODO husk å sette til standard verdier på producer når filteret uncheckes #### evt alle
  // const handleFilterChange = (evt) => {
  //   const { target: { value } } = evt;
  // }
  const handleSelectChange = event => {
    const value = event.target.value;
    setSelect(value);
    setMainDoorList(value);
  };
  return (
    <Wrapper>
      <Item active={select === "main"}>
        <RadioButton
          type="radio"
          name="radio"
          value="main"
          checked={select === "main"}
          onChange={event => handleSelectChange(event)}
          />
        <RadioButtonLabel />
        <div>Vis alle</div>
      </Item>
      <Item active={select === "glass"}>
        <RadioButton
          type="radio"
          name="radio"
          value="glass"
          checked={select === "glass"}
          onChange={event => handleSelectChange(event)}
          />
        <RadioButtonLabel />
        <div>Med glass</div>
      </Item>
      <Item active={select === "tradisjonell"}>
        <RadioButton
          type="radio"
          name="radio"
          value="tradisjonell"
          checked={select === "tradisjonell"}
          onChange={event => handleSelectChange(event)}
          />
        <RadioButtonLabel />
        <div>Tradisjonell</div>
      </Item>
      <Item active={select === "moderne"}>
        <RadioButton
          type="radio"
          name="radio"
          value="moderne"
          checked={select === "moderne"}
          onChange={event => handleSelectChange(event)}
          />
        <RadioButtonLabel />
        <div>Moderne</div>
      </Item>
    </Wrapper>
  );
};

export {Filters};