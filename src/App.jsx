import React from 'react';
import './App.css';
import {Controls, MainDoorControl, ImageUploader} from "./Components/Controls";
import {Display} from "./Components/Display";
import {useDoor} from "./Components/hooks";
import {OrderLink} from "./Components/OrderButton"
import styled from 'styled-components';

const AppWrapper = styled.div`
    /* display: flex;
    flex-direction: column; */
`;

const Grid = styled.div`
`;

const Row = styled.div`
    display: flex;
`;
const Col = styled.div`
    flex: ${(props) => props.size};
`;

function App() {
    const doorHook = useDoor();
    return (
        <AppWrapper className="App">
            <Grid>
                <Row>
                    <Col size={1}>
                        <ImageUploader doorHook={doorHook}/>
                    </Col>
                </Row>
                <Row>
                    <Col size={1}>
                        <p> Filtere her </p>
                    </Col>
                    <Col size={2}>
                        <MainDoorControl doorHook={doorHook}/>
                    </Col>
                </Row>
                    <Col size={1}>
                        <Controls doorHook={doorHook}/>
                    </Col>
                    <Col size={2}>
                        <Display doorHook={doorHook}/>
                    </Col>
                <Row>

                </Row>
            </Grid>
            <Controls doorHook={doorHook}/>
            <MainDoorControl doorHook={doorHook}/>
            <Display doorHook={doorHook}/>
            <OrderLink doorHook={doorHook}/>
        </AppWrapper>
    );
}

export default App;
