import React from "react";
import styled from "styled-components";
import { getDoorsByProducer } from "../api";

const Wrapper = styled.div`
  height: auto;
  width: 100%;
  padding: 0px 16px 24px 16px;
  box-sizing: border-box;
`;

const ItemWrapper = styled.div`
  justify-content: center;
  display: flex;
  flex-direction: row-reverse;
  flex-wrap: wrap;
  width: 100%;
  margin-right: 1em;
`;
const Item = styled.div`
  height: 38px;
  position: relative;
  border: 1px solid #ccc;
  box-sizing: border-box;
  //width: 100%; // 90
  border-radius: 2px;
  margin-bottom: 10px;
  background: white;
  vertical-align: middle;
`;

const MappedItems = styled.div`
  width: 100%;
  /* padding-left: 2px;
  width: 48%;
  min-width: 105px;
  &:first-child {
        width: 100%;
    } */
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

const style = {
  listContainer: {
    listStyle: "none",
    paddingLeft: 0,
  },
  itemStyle: {
    cursor: "pointer",
    padding: 0,
  },
};


const MultiselectCheckbox = ({ doorHook }) => {
  const { setMainDoors } = doorHook;
  const [data, setData] = React.useState([
    { label: "Vis alle", prop: "main", checked: true},                     // data[0]
    { label: "Tradisjonell", prop: "tradisjonell", checked: false},     // data[3]
    { label: "Moderne", prop: "moderne", checked: false},               // data[4]
    { label: "Med glass", prop: "glass", checked: false},               // data[1]
    { label: "Uten glass", prop: "uglass", checked: false},             // data[2]
  ]);

  React.useEffect(() => {
    const updateFieldChanged = index => e => {
      let newArr = [...data]; // copying the old datas array
      newArr[index] = e.target.value;
      setData(newArr); 
    };  

    const checkedBoxes = data
      .filter((box) => box.checked)
      .map((box) => box.prop);

    const fetchData = async () => {
      let doors = [];

      for (const prop of checkedBoxes) {
        const {
          data: { resources },
        } = await getDoorsByProducer(prop);
        doors.push(...resources);
      }

      const doorCount = {};

      // Count appearances
      const duplicates = [];
      // Looper alle dørene
      for (const door of doors) {
        // Om den er lagt til, inkrementer telleren
        if (doorCount[door.public_id]) {
          doorCount[door.public_id]++;
          // Sjekker om det er likt antall duplikater som antall bokser checked. 
          if (doorCount[door.public_id] === checkedBoxes.length) {
            duplicates.push(door);
          }
        } else {
          doorCount[door.public_id] = 1;
        }
      }

      if (duplicates.length !== 0) {
        doors = duplicates;
      }

      setMainDoors(doors);
    };
    fetchData();
  }, [data]);

  const handleClick = (index) => {
    const target = index;
    const newData = [...data];
    const oldObject = newData[index];
    const newObject = { ...oldObject, checked: !oldObject["checked"] };
    newData[index] = newObject;
    // sets all to false, so we avoid filter problems
    if(target == 0){
      newData[1] = {...newData[1], checked: false}
      newData[2] = {...newData[2], checked: false}
      newData[3] = {...newData[3], checked: false}
      newData[4] = {...newData[4], checked: false}

    }
    // unchecks sibling
    if(target == 1){
      newData[0] = {...newData[0], checked: false} // unchecks view all
      newData[1] = {...newData[1], checked: (newData[1].checked)}
      newData[2] = {...newData[2], checked: (!newData[1].checked)} 
      };
    //unchecks sibling
    if(target == 2){
      newData[0] = {...newData[0], checked: false} //unchecks view all
      newData[1] = {...newData[1], checked: (!newData[2].checked)}
      newData[2] = {...newData[2], checked: (newData[2].checked)}
    };
    // unchecks sibling
    if(target == 3){
      newData[0] = {...newData[0], checked: false} // unchecks view all
      newData[3] = {...newData[3], checked: (newData[3].checked)}
      newData[4] = {...newData[4], checked: (!newData[3].checked)} 
      };
    //unchecks sibling
    if(target == 4){
      newData[0] = {...newData[0], checked: false} //unchecks view all
      newData[3] = {...newData[3], checked: (!newData[4].checked)}
      newData[4] = {...newData[4], checked: (newData[4].checked)}
    };
    setData(newData);
    console.log("newObject: " + newObject);
  };

  return (
    <ItemWrapper id="wrapper">
      {data.map((item, index) => {
        return (
          <MappedItems id="mappedItems" >
            <Item
              key={item.label}
              style={
                item.checked ? {backgroundColor: '#E5F2E4'} : {backgroundColor: '#F2E4E5'}
              }
              onClick={() => handleClick(index)}
              >
              <input readOnly type="checkbox" checked={item.checked} className="visually-hidden"/>
              {item.label}
            </Item>
          </MappedItems>
        );
      })}
    </ItemWrapper>
  );
};

export { MultiselectCheckbox };
