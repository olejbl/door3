import React,{useEffect} from 'react';
import './App.css';
import {Controls, ImageUploader} from "./Components/Controls";
import {MainDoorControl} from "./Components/MainDoorControl";
import {MultiselectCheckbox} from "./Components/Filters";
import {RedactionalViewer} from "./Components/Redactional";
import {Display} from "./Components/Display";
import {useDoor} from "./Components/hooks";
import {OrderLink} from "./Components/OrderButton";
import {BackgroundSelector} from "./Components/BackgroundSelector";
import styled from 'styled-components';
import ReactGA from "react-ga";  //Google Analytics

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
    padding-right: 0em;
`;


function App() {
    const doorHook = useDoor();

    useEffect(() => {
        ReactGA.initialize('UA-180462469-1');
        ReactGA.pageview(window.location.pathname);
      })

    return (
        <AppWrapper className="App">
            <Grid>
                {/* <Row>
                    <Col size={1}>
                        <ImageUploader doorHook={doorHook}/>
                    </Col>
                    <Col size={5}>
                        <h1> Her kan det stå redaksjonell tekst</h1>
                    </Col>
                </Row> */}
                {/* <Row>
                    <p></p>
                </Row> */}
                <Row>
                    <Col size={1}>
                        <ImageUploader doorHook={doorHook}/>
                        <MultiselectCheckbox doorHook={doorHook}/>
                        <Controls doorHook={doorHook}/>
                        <RedactionalViewer doorHook={doorHook}/>
                        <OrderLink doorHook={doorHook}/>
                    </Col>
                    <Col size={5}>
                        <MainDoorControl doorHook={doorHook}/>
                        <Display doorHook={doorHook}/>
                        <BackgroundSelector doorHook={doorHook}/>
                    </Col>
                </Row>
                <Row>
                    <Col size={1}>
                       
                    </Col>
                    <Col size={5}>
                        
                    </Col>
                    {/* <Col size={1}>
                        <RedactionalViewer doorHook={doorHook}/>
                        <OrderLink doorHook={doorHook}/>
                    </Col> */}
                </Row>
            </Grid>
        </AppWrapper>
    );
}

export default App;
