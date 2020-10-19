import React from "react";
import styled from "styled-components";
import { getDoorsByProducer } from "../api";

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
  ${(props) =>
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

const style = {
  listContainer: {
    listStyle: "none",
    paddingLeft: 0,
  },
  itemStyle: {
    cursor: "pointer",
    padding: 5,
  },
};

// const Filters = ({doorHook}) => {
//   const { setMainDoorList, select, setSelect } = doorHook;
//   // TODO husk å sette til standard verdier på producer når filteret uncheckes #### evt alle
//   // const handleFilterChange = (evt) => {
//   //   const { target: { value } } = evt;
//   // }
//const options = [{ label: 'Item One' }, { label: 'Item Two' }];
//TODO 1 - Check hvilket filter du vil ha
//TODO 2 - fetchFilters( filteret du ville ha ) https://res.cloudinary.com/dikc1xnkv/image/list/${FILTERET}.json`
//TODO 3 - Kombinér JSON med alle andre filter-JSON som er valgt, velg de som går igjen i alle
//TODO 4 - returner liste med json-objekter som oppstår i alle JSON

const MultiselectCheckbox = ({ doorHook }) => {
  const { setMainDoors } = doorHook;
  const [data, setData] = React.useState([
    { label: "Alle", prop: "main", checked: false },
    { label: "Med glass", prop: "glass", checked: false },
    { label: "Tradisjonell", prop: "tradisjonell", checked: false },
    { label: "Moderne", prop: "moderne", checked: false },
  ]);

  React.useEffect(() => {
    const checkedBoxes = data
      .filter((box) => box.checked)
      .map((box) => box.prop);

    const fetchData = async () => {
      let doors = [];

      for (const prop of checkedBoxes) {
        const {
          data: { resources },
        } = await getDoorsByProducer(prop);

        resources.forEach((door) => doors.push(door.public_id));
      }

      const uniq = doors
        .map((door) => {
          return {
            count: 1,
            name: door,
          };
        })
        .reduce((a, b) => {
          a[b.name] = (a[b.name] || 0) + b.count;
          return a;
        }, {});

      const duplicates = Object.keys(uniq).filter((a) => uniq[a] > 1);

      if (duplicates.length !== 0) {
        doors = duplicates;
      }

      setMainDoors(doors);
    };
    fetchData();
  }, [data]);

  const handleClick = (index) => {
    const newData = [...data];
    const oldObject = newData[index];
    const newObject = { ...oldObject, checked: !oldObject["checked"] };
    newData[index] = newObject;
    setData(newData);
  };

  return (
    <ul style={style.listContainer}>
      {data.map((item, index) => {
        return (
          <li
            key={item.label}
            style={style.itemStyle}
            onClick={() => handleClick(index)}
          >
            <input readOnly type="checkbox" checked={item.checked} />
            {item.label}
          </li>
        );
      })}
    </ul>
  );
};

// const handleSelectChange = event => {
//   const value = event.target.value;
//   setSelect(value);
//   setMainDoorList(value);
// };
// return (
//   <Wrapper>
//     <Item active={select === "main"}>
//       <RadioButton
//         type="radio"
//         name="radio"
//         value="main"
//         checked={select === "main"}
//         onChange={event => handleSelectChange(event)}
//         />
//       <RadioButtonLabel />
//       <div>Vis alle</div>
//     </Item>
//     <Item active={select === "glass"}>
//       <RadioButton
//         type="radio"
//         name="radio"
//         value="glass"
//         checked={select === "glass"}
//         onChange={event => handleSelectChange(event)}
//         />
//       <RadioButtonLabel />
//       <div>Med glass</div>
//     </Item>
//     <Item active={select === "tradisjonell"}>
//       <RadioButton
//         type="radio"
//         name="radio"
//         value="tradisjonell"
//         checked={select === "tradisjonell"}
//         onChange={event => handleSelectChange(event)}
//         />
//       <RadioButtonLabel />
//       <div>Tradisjonell</div>
//     </Item>
//     <Item active={select === "moderne"}>
//       <RadioButton
//         type="radio"
//         name="radio"
//         value="moderne"
//         checked={select === "moderne"}
//         onChange={event => handleSelectChange(event)}
//         />
//       <RadioButtonLabel />
//       <div>Moderne</div>
//     </Item>
//   </Wrapper>
// );
//};

export { MultiselectCheckbox };
