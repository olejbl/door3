import React, {useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
// import { useDoor } from "./hooks";
import { solve } from '../scripts/numeric-solve';
import {CloudinaryContext, Image} from 'cloudinary-react';
import * as d3 from 'd3';
import Draggable from './Draggable';

const Display = ({ doorHook }) => {
  const { selectedDoor, background } = doorHook;
  
  if (!background) return (
    <p>Last opp et bilde av ditt inngangsparti først!</p>
  );

  if (!selectedDoor) return (
    <h1>Du har lastet opp et bilde, vennligst klikk på en dør.</h1>
  )


  return (
    <DoorPreviewer doorHook={doorHook}/>
  )
};

const DoorPreviewBackground = styled.div`
  background-image: url(${props => props.bg});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  background-color: #CECECE;
  position: relative;
  width: 900px;
  height: 500px;
  padding: 0.4em;
  box-sizing: border-box;
  margin: auto auto 1em auto;
  
  & svg {
    position: absolute;
    top: 0;
    left: 0;
  }
  
  & .line {
    stroke: #000;
    stroke-opacity: .5;
    stroke-width: 1px;
    stroke-linecap: square;
  }
  
  & .handle {
    fill: none;
    pointer-events: all;
    stroke: #fff;
    stroke-width: 2px;
    cursor: move;
  }
`;

// const DraggableDoor = styled.svg`
//   border: solid 0.1em lightblue;
//   overflow: hidden;
//   width: 100%;
//   height: 100%;
//   position: absolute;
//   top: 0;
//   left: 0;
// `;

const DoorPreviewWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
  touch-action: none;
`;
const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  touch-action: none;

  /*This prevents the Copy, Paste, Select... menu from appearing on mobile*/
  -webkit-user-select: none; /* Safari */ 
  -ms-user-select: none; /* IE 10+ and Edge */
  user-select: none; /* Standard syntax */
`;

const CircleWrapper = styled.svg`
  & circle {
    opacity: 0;
  }
  &:hover circle {
    opacity: 1;
  }
  padding: 1em;
`;
const ResetButton = styled.button `
  z-index: 100;
  position: relative;
  /*This prevents the Copy, Paste, Select... menu from appearing on mobile*/
  -webkit-user-select: none; /* Safari */ 
  -ms-user-select: none; /* IE 10+ and Edge */
  user-select: none; /* Standard syntax */
`

const calculateMatrix = (from, to) => {
  for (var a = [], b = [], i = 0, n = from.length; i < n; ++i) {
    var s = from[i], t = to[i];
    a.push([s[0], s[1], 1, 0, 0, 0, -s[0] * t[0], -s[1] * t[0]]);
    b.push(t[0]);
    a.push([0, 0, 0, s[0], s[1], 1, -s[0] * t[1], -s[1] * t[1]]);
    b.push(t[1]);
  }

  var X = solve(a, b, true);
  return [
    X[0], X[3], 0, X[6],
    X[1], X[4], 0, X[7],
      0,    0, 1,    0,
    X[2], X[5], 0,    1
  ].map(function(x) {
    return parseFloat(d3.format(".9f")(x).replace('−', '-'));
  });
}

const TransformedDoor = ({ doorHook }) => {
  const { selectedDoor } = doorHook;
  const [ doorWidth, setDoorWidth ] = useState(0);
  const [ doorHeight, setDoorHeight] = useState(0);
  const [ reset, setReset ] = useState(0);

  const DEFAULT_MATRIX = [1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0];
  const [ doorOffset, setDoorOffset ] = useState({x: 300, y: 200});

  const [cornerOne, setCornerOne] = useState({x: 0, y: 0, isDragging: false});
  const [cornerTwo, setCornerTwo] = useState({x: 0, y: 0, isDragging: false});
  const [cornerThree, setCornerThree] = useState({x: 0, y: 0, isDragging: false});
  const [cornerFour, setCornerFour] = useState({x: 0, y: 0, isDragging: false});

  const corners = [
    {corner: cornerOne, setCorner: setCornerOne},
    {corner: cornerTwo, setCorner: setCornerTwo},
    {corner: cornerThree, setCorner: setCornerThree},
    {corner: cornerFour, setCorner: setCornerFour},
  ];

  useEffect(() => {
    const { width, height } = selectedDoor;
    const scaler = 200 / Math.max(width, height);

    const w = width * scaler;
    const h = height * scaler;

    setDoorWidth(w);
    setDoorHeight(h);

    setCornerOne({x: doorOffset.x, y: doorOffset.y, isDragging: false});
    setCornerTwo({x: doorOffset.x + w, y: doorOffset.y, isDragging: false});
    setCornerThree({x: doorOffset.x + w, y: doorOffset.y + h, isDragging: false});
    setCornerFour({x: doorOffset.x, y: doorOffset.y + h, isDragging: false});

    setReset(0); //change in the dependency [reset] triggers re-render of the component
  }, [selectedDoor, reset]);

  const doorCorners = [
    [0, 0],
    [doorWidth, 0],
    [doorWidth, doorHeight],
    [0, doorHeight]
  ];

  const circleCorners = [
    [cornerOne.x, cornerOne.y],
    [cornerTwo.x, cornerTwo.y],
    [cornerThree.x, cornerThree.y],
    [cornerFour.x, cornerFour.y],
  ];

  const transformationMatrix = calculateMatrix(doorCorners, circleCorners) || DEFAULT_MATRIX;

  return (
    <DoorPreviewWrapper width="900px" height="500px">
      <ResetButton id="resetButton"
        onClick={() => {
          setReset(prev => prev + Math.random());
        }}>
        Tilbakestill
      </ResetButton>
      
        <ImageWrapper
          style={{
            backgroundColor: 'rgba(255,0,0,0.5)',
            transformOrigin: `${doorOffset.x}px ${doorOffset.y}px`,
            transform: `matrix3d(${transformationMatrix.toString()})`
          }}>
            <CloudinaryContext cloudName="dikc1xnkv">
              
          <Image style={{
            transform: `translate(${doorWidth}px, ${doorHeight}px)`, 
            width: doorWidth+'px', 
            height: doorHeight+'px',
          }}
          publicId={selectedDoor.public_id} width={doorWidth} height={doorHeight} q="100" loading="lazy" />
          </CloudinaryContext>
        </ImageWrapper>
      <CircleWrapper viewBox='0 0 900 500'>
      <g transform={`translate(${doorOffset.x}, ${doorOffset.y})`}>
         {
           corners.map(({corner, setCorner}) => {
             return (
              <Draggable x={corner.x} y={corner.y} onPositionChange={setCorner}>
                {({ x, y, isDragging, handleMouseDown}) => (
                  <circle
                    className="handle"
                    onMouseDown={handleMouseDown}
                    transform={`translate(${x}, ${y})`}
                    r="7"
                  />
                )}
              </Draggable> 
             )
           })
         }
         </g>
      </CircleWrapper>
    </DoorPreviewWrapper>
  );
};
// const WordFormatter = (word) => {
//   let result = word.split("/")[0]; // splits string on first "/""
//   result = result.replace(/_/g, " "); // replaces "_" with whitespace
//   result = result.split(' '); // split into array 
//   result[0] = result[0].replace(/./,x=>x.toUpperCase()); //sets first letter of first word to uppercase
//   result[1] = result[1].replace(/./,x=>x.toUpperCase()); //sets first letter of second word to uppercase
//   result = Array.prototype.join.call(result, " "); //joins the pseudo-array
//   return result;
// }


const DoorPreviewer = ({doorHook}) => {
  const {background, selectedDoor} = doorHook;
  return (
    <div id='transformBakgrunn' style={{backgroundColor: '#CECECE'}}>
      <DoorPreviewBackground bg={background}>
        <TransformedDoor doorHook={doorHook}/>
      </DoorPreviewBackground>
    </div>

  );
}

export {Display};