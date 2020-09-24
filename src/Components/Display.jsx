import React, {useEffect, useState, useRef} from 'react';
import styled from 'styled-components';
import { useDoor } from "./hooks";
import { solve } from '../scripts/numeric-solve';
import * as d3 from 'd3';

const DisplayWrapper = styled.div`

`;

const Display = ({ doorHook }) => {
  const { selectedDoor, background } = doorHook;
  
  if (!selectedDoor) return (
    <p>Please select a door.</p>
  );

  if (!background) return (
    <p>No background image selected!</p>
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
`;


const TransformedDoor = ({ doorHook }) => {
  const { background, selectedDoor } = doorHook;
  const [ doorWidth, setDoorWidth ] = useState(0);
  const [ doorHeight, setDoorHeigt] = useState(0);
  const [ transformationMatrix, setTransformationMatrix] = useState(
    [1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0]
  );
  const [ doorOffset, setDoorOffset ] = useState({
    x: 300,
    y: 200,
  });
  const [ mouseState, setMouseState ] = useState({
    targetCircle: -1,
  });

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
    setDoorWidth(w);
    setDoorHeigt(h);
    setCorners({
      0: {x: 0, y: 0},
      1: {x: w, y: 0},
      2: {x: w, y: h},
      3: {x: 0, y: h},
    });
  }, [selectedDoor]);

  const handleCirleChoice = (index) => {
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
      return parseFloat(d3.format(".6f")(x).replace('−', '-'));
    });
  }

  const handleMouseMove = (evt) => {
    if (evt.target.localName === 'svg') {
      const offset = evt.target.getBoundingClientRect();
      const x = evt.clientX - offset.left;
      const y = evt.clientY - offset.top;
      if (mouseState.targetCircle >= 0) {
        setCorners({
          ...corners,
          [mouseState.targetCircle]: {x, y}
        })
      }
      const doorCorners = [
        [doorOffset.x, doorOffset.y],
        [doorOffset.x + doorWidth, doorOffset.y],
        [doorOffset.x + doorWidth, doorOffset.y + doorHeight],
        [doorOffset.x, doorOffset.y + doorHeight]
      ]

      const circleCorners = Object.values(corners)
        .map(({x, y}) => [x, y]);
      
      setTransformationMatrix(
        getMatrix(doorCorners, circleCorners)
      );
      console.log(transformationMatrix);
    }  
  }

  const handleMouseUp = (evt) => {
    setMouseState({...mouseState, targetCircle: -1});
  };

  return (
    <div onMouseUp={handleMouseUp} >
      <DraggableDoor width="900" height="500">
        <g style={
          {
            transform: `matrix3d(${transformationMatrix.toString()})`
          }
        }>
          <rect width="300" height="100" style={{fill:'rgb(0,0,255)', strokeWidth:'3', stroke:'rgb(0,0,0)'}} />
        </g>
      </DraggableDoor>
      <svg width="900" height="500" onMouseMove={handleMouseMove}>
        <g transform="translate(0,0)">
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
      </svg>
    </div>
  );
}; ///////////////her

const DoorPreviewer = ({doorHook}) => {
  const {background} = doorHook;
  
  useEffect(() => {
    var margin = {top: 50, right: 280, bottom: 50, left: 280},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    var transform = ["", "-webkit-", "-moz-", "-ms-", "-o-"].reduce(
      function(p, v) { return v + "transform" in document.body.style ? v : p; }
      ) + "transform";

    var sourcePoints = [[0, 0], [width, 0], [width, height], [0, height]],
        targetPoints = [[0, 0], [width, 0], [width, height], [0, height]];

    d3.select("body").selectAll("svg")
        .data(["transform", "flat"])
      .enter().append("svg")
        .attr("id", function(d) { return d; })
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var svgTransform = d3.select("#transform")
        .style(transform + "-origin", margin.left + "px " + margin.top + "px 0");

    var svgFlat = d3.select("#flat");

    svgTransform.select("g").append("image")
        .attr("xlink:href", background)
        .attr("width", width)
        .attr("height", height);

    svgTransform.select("g").selectAll(".line--x")
        .data(d3.range(0, width + 1, 40))
      .enter().append("line")
        .attr("class", "line line--x")
        .attr("x1", function(d) { return d; })
        .attr("x2", function(d) { return d; })
        .attr("y1", 0)
        .attr("y2", height);

    svgTransform.select("g").selectAll(".line--y")
        .data(d3.range(0, height + 1, 40))
      .enter().append("line")
        .attr("class", "line line--y")
        .attr("x1", 0)
        .attr("x2", width)
        .attr("y1", function(d) { return d; })
        .attr("y2", function(d) { return d; });

    var handle = svgFlat.select("g").selectAll(".handle")
        .data(targetPoints)
      .enter().append("circle")
        .attr("class", "handle")
        .attr("transform", function(d) { return "translate(" + d + ")"; })
        .attr("r", 22)
        .call(d3.drag()
          //.subject(function(d) { return {x: d[0], y: d[1]}; }) // .origin(function(d) { return {x: d[0], y: d[1]}; }) 
          .on("drag", dragged));

    function dragged(evt, d) {
      d3.select(this).attr("transform", "translate(" + (d[0] = evt.x) + "," + (d[1] = evt.y) + ")");
      transformed();
    }

    function transformed() {
      for (var a = [], b = [], i = 0, n = sourcePoints.length; i < n; ++i) {
        var s = sourcePoints[i], t = targetPoints[i];
        a.push([s[0], s[1], 1, 0, 0, 0, -s[0] * t[0], -s[1] * t[0]]);
        b.push(t[0]);
        a.push([0, 0, 0, s[0], s[1], 1, -s[0] * t[1], -s[1] * t[1]]);
        b.push(t[1]);
      }

      var X = solve(a, b, true), matrix = [
        X[0], X[3], 0, X[6],
        X[1], X[4], 0, X[7],
          0,    0,  1,   0,
        X[2], X[5], 0,   1
      ].map(function(x) {
        return d3.format(".7f")(x);
      });

      svgTransform.style(transform, "matrix3d(" + matrix + ")");
    }
  }, [])

  return (
    <DoorPreviewBackground bg={background}>
      <TransformedDoor doorHook={doorHook}/>
    </DoorPreviewBackground>
  );
}

export {Display};