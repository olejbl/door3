import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
// import { useDoor } from "./hooks";
import { solve } from "../scripts/numeric-solve";
import { CloudinaryContext, Image } from "cloudinary-react";
import * as d3 from "d3";

const Display = ({ doorHook }) => {
  const { selectedDoor, background } = doorHook;

  if (!background) return <p>Last opp et bilde av ditt inngangsparti først!</p>;

  if (!selectedDoor)
    return <h1>Du har lastet opp et bilde, vennligst klikk på en dør.</h1>;

  return <DoorPreviewer doorHook={doorHook} />;
};

const DoorPreviewBackground = styled.div`
  background-image: url(${(props) => props.bg});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  background-color: #ececec;
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
    stroke-opacity: 0.5;
    stroke-width: 1px;
    stroke-linecap: square;
  }

  & .handle {
    fill: none;
    pointer-events: all;
    stroke: #fff;
    stroke-width: 1px;
    cursor: move;
  }
`;

const DoorPreviewWrapper = styled.div`
  text-align: center;
  overflow: hidden;
  width: 100%;
  height: 100%;
  position: absolute;
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
const ResetButton = styled.button`
  z-index: 100;
  position: relative;
  /*This prevents the Copy, Paste, Select... menu from appearing on mobile*/
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10+ and Edge */
  user-select: none; /* Standard syntax */

  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  box-sizing: border-box;
  font: inherit;
  overflow: visible;
  text-transform: none;
  font-size: 12px;
  font-weight: 400;
  display: inline-block;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  touch-action: manipulation;
  cursor: pointer;
  user-select: none;
  background-image: none;
  border-radius: 0px;
  border: none;
  line-height: 30px;
  color: #fff;
  transition: all ease 250ms;
  letter-spacing: 1px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
  border-radius: 2px;
  margin: 0;
  padding: 0 1.3em;
  position: relative;
  z-index: 1;
  background-color: #97262c;
`;

const TransformedDoor = ({ doorHook }) => {
  const { selectedDoor } = doorHook;
  const [doorWidth, setDoorWidth] = useState(0);
  const [doorHeight, setDoorHeight] = useState(0);
  const [reset, setReset] = useState(0);

  const DEFAULT_MATRIX = [
    1.0,
    0.0,
    0.0,
    0.0,
    0.0,
    1.0,
    0.0,
    0.0,
    0.0,
    0.0,
    1.0,
    0.0,
    0.0,
    0.0,
    0.0,
    1.0,
  ];
  const [transformationMatrix, setTransformationMatrix] = useState(
    DEFAULT_MATRIX
  );
  const [doorOffset, setDoorOffset] = useState({ x: 300, y: 200 });
  const [mouseState, setMouseState] = useState({ targetCircle: -1 }); //keeps track of which corner should move
  const [corners, setCorners] = useState({
    0: { x: 0, y: 0 },
    1: { x: doorWidth, y: 0 },
    2: { x: doorWidth, y: doorHeight },
    3: { x: 0, y: doorHeight },
  });

  const debounce = useRef();
  const lastCorners = useRef(corners);

  useEffect(() => {
    lastCorners.current = corners;
  }, [corners, lastCorners]);

  useEffect(() => {
    const { width, height } = selectedDoor;
    const scaler = 200 / Math.max(width, height);
    const w = width * scaler;
    const h = height * scaler;
    if (w !== doorWidth || h !== doorHeight || reset !== 0) {
      setDoorWidth(w);
      setDoorHeight(h);
      setCorners({
        0: { x: 0, y: 0 },
        1: { x: w, y: 0 },
        2: { x: w, y: h },
        3: { x: 0, y: h },
      });
      setTransformationMatrix(DEFAULT_MATRIX);
      setReset(0); //change in the dependency [reset] triggers re-render of the component
    }
  }, [selectedDoor, reset]);

  const handleCirleChoice = (index) => {
    console.log(index);
    setMouseState({ ...mouseState, targetCircle: index });
  };

  const getMatrix = (from, to) => {
    for (var a = [], b = [], i = 0, n = from.length; i < n; ++i) {
      var s = from[i],
        t = to[i];
      a.push([s[0], s[1], 1, 0, 0, 0, -s[0] * t[0], -s[1] * t[0]]);
      b.push(t[0]);
      a.push([0, 0, 0, s[0], s[1], 1, -s[0] * t[1], -s[1] * t[1]]);
      b.push(t[1]);
    }

    var X = solve(a, b, true);
    return [
      X[0],
      X[3],
      0,
      X[6],
      X[1],
      X[4],
      0,
      X[7],
      0,
      0,
      1,
      0,
      X[2],
      X[5],
      0,
      1,
    ].map(function (x) {
      return parseFloat(d3.format(".20f")(x).replace("−", "-")); // debug here
    });
  };

  const handleMouseMove = (evt) => {
    const offset = document
      .getElementById("draggableCircles")
      .getBoundingClientRect();
    if (evt.target.localName === "circle" || evt.target.localName === "svg") {
      const x = evt.clientX - offset.left - doorOffset.x;
      const y = evt.clientY - offset.top - doorOffset.y;
      const mouseX = evt.clientX - offset.left - doorOffset.x;
      const mouseY = evt.clientY - offset.top - doorOffset.y;
      console.log("Moving ", evt.target.localName);

      clearTimeout(debounce.current);
      debounce.current = setTimeout(() => {
        if (mouseState.targetCircle >= 0) {
          if (mouseState.targetCircle === 4) {
            console.log("last corners: ", lastCorners," mouse: ", mouseX,",",mouseY);
            setCorners({
              0: {
                x: mouseX - lastCorners.current[0].x,
                y: mouseY - lastCorners.current[0].y,
              },
              1: {
                x: mouseX - lastCorners.current[1].x,
                y: mouseY - lastCorners.current[1].y,
              },
              2: {
                x: mouseX - lastCorners.current[2].x,
                y: mouseY - lastCorners.current[2].y,
              },
              3: {
                x: mouseX - lastCorners.current[3].x,
                y: mouseY - lastCorners.current[3].y,
              },
            });

            const doorCorners = [
              [0, 0],
              [doorWidth, 0],
              [doorWidth, doorHeight],
              [0, doorHeight],
            ];

            const circleCorners = Object.values(corners).map(({ x, y }) => [
              x,
              y,
            ]);

            setTransformationMatrix(getMatrix(doorCorners, circleCorners));

          } else {
            setCorners({
              ...corners,
              [mouseState.targetCircle]: { x, y },
            });
            const doorCorners = [
              [0, 0],
              [doorWidth, 0],
              [doorWidth, doorHeight],
              [0, doorHeight],
            ];

            const circleCorners = Object.values(corners).map(({ x, y }) => [
              x,
              y,
            ]);

            setTransformationMatrix(getMatrix(doorCorners, circleCorners));
          }
        }
      }, 1); // 1ms debounce
    }
  };

  const handleTouchMove = (evt) => {
    if (evt.target.localName === "circle" || evt.target.localName === "svg") {
      const bodyRect = document
        .getElementById("gElement")
        .getBoundingClientRect();
      const x = evt.changedTouches[0].clientX - bodyRect.left; // touch
      const y = evt.changedTouches[0].clientY - bodyRect.top; // touch
      console.log(evt.changedTouches[0].clientX);
      if (mouseState.targetCircle >= 0) {
        if (mouseState === 4) {
          console.log("Moving door"); //not working
        } else {
          setCorners({
            ...corners,
            [mouseState.targetCircle]: { x, y }, //todo touch
          });
          const doorCorners = [
            [0, 0],
            [doorWidth, 0],
            [doorWidth, doorHeight],
            [0, doorHeight],
          ];

          const circleCorners = Object.values(corners).map(({ x, y }) => [
            x,
            y,
          ]);
          setTransformationMatrix(getMatrix(doorCorners, circleCorners));
        }
      }
    }
  };

  const handleMouseUp = (evt) => {
    setMouseState({ ...mouseState, targetCircle: -1 });
  };
  const handleTouchEnd = (evt) => {
    setMouseState({ ...mouseState, targetCircle: -1 });
    console.log("Touch ended");
  };
  //TODO WIDTH HEIGHT
  return (
    <DoorPreviewWrapper
      onMouseUp={handleMouseUp}
      onTouchEnd={handleTouchEnd}
      width="900px"
      height="500px"
    >
      <ResetButton
        id="resetButton"
        onClick={() => {
          setReset((prev) => prev + Math.random());
        }}
      >
        {" "}
        Tilbakestill{" "}
      </ResetButton>
      <CloudinaryContext cloudName="dikc1xnkv">
        <ImageWrapper
          style={{
            transformOrigin: `${doorOffset.x}px ${doorOffset.y}px`,
            transform: `matrix3d(${transformationMatrix.toString()})`,
          }}
        >
          <Image
            style={{
              transform: `translate(${-doorWidth}px, ${doorHeight}px)`,
              width: doorWidth + "px",
              height: doorHeight + "px",
            }}
            publicId={selectedDoor.public_id}
            width={doorWidth}
            height={doorHeight}
            q="100"
            loading="lazy"
          />
        </ImageWrapper>
      </CloudinaryContext>
      <CircleWrapper
        viewBox="0 0 900 500"
        id="draggableCircles"
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        <g
          id="gElement"
          transform={`translate(${doorOffset.x}, ${doorOffset.y})`}
        >
          <circle
            className="handle"
            onMouseDown={() => handleCirleChoice(4)}
            transform={`translate(${(corners[2].x + corners[0].x)/2}, ${(corners[3].y + corners[1].y)/2})`}
            r="10"
          />
          <circle
            className="handle"
            onMouseDown={() => handleCirleChoice(0)}
            onTouchStart={() => handleCirleChoice(0)}
            transform={`translate(${corners[0].x - 5}, ${corners[0].y - 15})`}
            r="7"
          />
          <circle
            className="handle"
            onMouseDown={() => handleCirleChoice(1)}
            onTouchStart={() => handleCirleChoice(1)}
            transform={`translate(${corners[1].x + 10}, ${corners[1].y - 15})`}
            r="7"
          />
          <circle
            className="handle"
            onMouseDown={() => handleCirleChoice(2)}
            onTouchStart={() => handleCirleChoice(2)}
            transform={`translate(${corners[2].x + 5}, ${corners[2].y + 5})`}
            r="7"
          />
          <circle
            className="handle"
            onMouseDown={() => handleCirleChoice(3)}
            onTouchStart={() => handleCirleChoice(3)}
            transform={`translate(${corners[3].x - 5}, ${corners[3].y + 5})`}
            r="7"
          />
        </g>
      </CircleWrapper>
    </DoorPreviewWrapper>
  );
};

const DoorPreviewer = ({ doorHook }) => {
  const { background, selectedDoor } = doorHook;
  return (
    <div id="transformBakgrunn" style={{ backgroundColor: "#ececec" }}>
      <DoorPreviewBackground bg={background}>
        <TransformedDoor doorHook={doorHook} />
      </DoorPreviewBackground>
    </div>
  );
};

export { Display };
