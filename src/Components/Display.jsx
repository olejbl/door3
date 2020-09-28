import React, {useEffect, useState, useRef} from 'react';
import styled from 'styled-components';
import { useDoor } from "./hooks";
import { solve } from '../scripts/numeric-solve';
import {CloudinaryContext, Image} from 'cloudinary-react';
import * as d3 from 'd3';

const DisplayWrapper = styled.div`

`;

const Display = ({ doorHook }) => {
  const { selectedDoor, background } = doorHook;
  
  if (!selectedDoor) return (
    <p>Vennligst velg en dør.</p>
  )

  if (!background) return (
    <p>Last opp bilde!</p>
  );

  return (
    <DoorPreviewer doorHook={doorHook}/>
  )
};

const DoorPreviewBackground = styled.div`
  background-image: url(${props => props.bg});
  background-size: cover;
  background-position: center;
  position: relative;
  width: 900px;
  height: 500px;
  padding: 0.4em;
  border: solid lightgray 0.2em;
  box-sizing: border-box;
  border-radius: 0.5em;
  
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

const DraggableDoor = styled.svg`
  border: solid 0.1em lightblue;
  overflow: hidden;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const DoorPreviewWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
  position: relative;
`;
const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const CircleWrapper = styled.svg`
  & circle {
    opacity: 0;
  }
  &:hover circle {
    opacity: 1;
  }
`;


const TransformedDoor = ({ doorHook }) => {
  const { background, selectedDoor } = doorHook;
  const [ doorWidth, setDoorWidth ] = useState(0);
  const [ doorHeight, setDoorHeigt] = useState(0);

  const DEFAULT_MATRIX = [1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0];
  const [ transformationMatrix, setTransformationMatrix] = useState(DEFAULT_MATRIX);
  const [ doorOffset, setDoorOffset ] = useState({x: 300,y: 200});
  const [ mouseState, setMouseState ] = useState({targetCircle: -1});
  const [ corners, setCorners ] = useState(
    {
     0: {x: 0, y: 0},
     1: {x: doorWidth, y: 0},
     2: {x: doorWidth, y: doorHeight},
     3: {x: 0, y: doorHeight},
    }
  );

  useEffect(() => {
    const { width, height } = selectedDoor;
    const scaler = 200 / Math.max(width, height);
    const w = width * scaler;
    const h = height * scaler;
    if (w !== doorWidth || h !== doorHeight) {
      setDoorWidth(w);
      setDoorHeigt(h);
      setCorners({
        0: {x: 0, y: 0},
        1: {x: w, y: 0},
        2: {x: w, y: h},
        3: {x: 0, y: h},
      });
      setTransformationMatrix(DEFAULT_MATRIX);
    }
  }, [selectedDoor]);

  const handleCirleChoice = (index) => {
    console.log(index);
    setMouseState({...mouseState, targetCircle: index});
  };

  const getMatrix = (from, to) => {
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

  const handleMouseMove = (evt) => {
    if (evt.target.localName === 'svg') {
      const offset = evt.target.getBoundingClientRect();
      const x = evt.clientX - offset.left - doorOffset.x;
      const y = evt.clientY - offset.top - doorOffset.y;
      if (mouseState.targetCircle >= 0) {
        if (mouseState === 4) {
          console.log('Moving door');
          setDoorOffset(
            {x: doorOffset.x + x},
            {y: doorOffset.y + y},
          )
        } else {
          setCorners({
            ...corners,
            [mouseState.targetCircle]: {x, y}
          });
          const doorCorners = [
            [0, 0],
            [doorWidth, 0],
            [doorWidth,doorHeight],
            [0, doorHeight]
          ]
    
          const circleCorners = Object.values(corners)
            .map(({x, y}) => [x, y]);
          
          setTransformationMatrix(
            getMatrix(doorCorners, circleCorners)
          );
        }
      }
      
    }  
  }

  const handleMouseUp = (evt) => {
    setMouseState({...mouseState, targetCircle: -1});
  };

  return (
    <DoorPreviewWrapper onMouseUp={handleMouseUp} width="900px" height="500px">
      <CloudinaryContext cloudName="dikc1xnkv">
        <ImageWrapper onMouseDown={() => handleCirleChoice(4)}
          style={{
            transformOrigin: `${doorOffset.x}px ${doorOffset.y}px`,
            transform: `matrix3d(${transformationMatrix.toString()})`
          }} >
          <Image style={{
            transform: `translate(${-doorWidth}px, ${doorHeight}px)`, 
            width: doorWidth+'px', 
            height: doorHeight+'px',
            imageRendering: 'crisp-edges'
          }}
           publicId={selectedDoor.public_id} width={doorWidth} height={doorHeight} q="100" />
        </ImageWrapper>
      </CloudinaryContext>
      <CircleWrapper viewBox='0 0 900 500' onMouseMove={handleMouseMove}>
        <g transform={`translate(${doorOffset.x}, ${doorOffset.y})`}>
          <circle
            className="handle"
            onMouseDown={() => handleCirleChoice(0)}
            transform={`translate(${corners[0].x}, ${corners[0].y})`} 
            r="7"
          />
          <circle
            className="handle"
            onMouseDown={() => handleCirleChoice(1)}
            transform={`translate(${corners[1].x}, ${corners[1].y})`} 
            r="7"
          />
          <circle
            className="handle"
            onMouseDown={() => handleCirleChoice(2)}
            transform={`translate(${corners[2].x}, ${corners[2].y})`} 
            r="7"
          />
          <circle
            className="handle"
            onMouseDown={() => handleCirleChoice(3)}
            transform={`translate(${corners[3].x}, ${corners[3].y})`} 
            r="7"
          />
        </g>
      </CircleWrapper>
    </DoorPreviewWrapper>
  );
};

const DoorPreviewer = ({doorHook}) => {
  const {background, selectedDoor} = doorHook;
  return (
    <div>
      <p id="selectedDoorFormatted">{(selectedDoor.public_id).split("/")[0].replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}</p>
      <DoorPreviewBackground bg={background}>
        <TransformedDoor doorHook={doorHook}/>
      </DoorPreviewBackground>
    </div>

  );
}

export {Display};