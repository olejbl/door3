import React, {useEffect} from 'react';
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
        .attr("xlink:href", "sailboat.png")
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
        .attr("r", 7)
        .call(d3.drag()
          .origin(function(d) { return {x: d[0], y: d[1]}; })
          .on("drag", dragged));

    function dragged(evt, d) {
      d3.select(this).attr("transform", "translate(" + (d[0] = evt.x) + "," + (d[1] = evt.y) + ")");
      transformed();
    }

    function transformed() {
      for (var a = [], b = [], i = 0, n = sourcePoints.length; i < n; ++i) {
        var s = sourcePoints[i], t = targetPoints[i];
        a.push([s[0], s[1], 1, 0, 0, 0, -s[0] * t[0], -s[1] * t[0]]), b.push(t[0]);
        a.push([0, 0, 0, s[0], s[1], 1, -s[0] * t[1], -s[1] * t[1]]), b.push(t[1]);
      }

      var X = solve(a, b, true), matrix = [
        X[0], X[3], 0, X[6],
        X[1], X[4], 0, X[7],
          0,    0, 1,    0,
        X[2], X[5], 0,    1
      ].map(function(x) {
        return d3.format(x)(6);
      });

      svgTransform.style(transform, "matrix3d(" + matrix + ")");
    }
  }, [])

  return (
    <DoorPreviewBackground bg={background}>
      
    </DoorPreviewBackground>
  );
}

export {Display};