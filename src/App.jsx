import React,{useEffect} from 'react';
import './App.css';
import {Controls, ImageUploader} from "./Components/Controls";
import {MainDoorControl} from "./Components/MainDoorControl";
import {Filters} from "./Components/Filters";
import {Display} from "./Components/Display";
import {useDoor} from "./Components/hooks";
import {OrderLink} from "./Components/OrderButton"
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
                <Row>
                    <Col size={1}>
                        <ImageUploader doorHook={doorHook}/>
                    </Col>
                    <Col size={3}>
                    <h3>Last opp et bilde av ditt inngangsparti ved å klikke på kameraet </h3>
                    <p> For best resultater, ta bildet i godt sollys. Du bør ta bildet i liggende format.</p>
                    <p> Tips: Skal du ha en annen størrelse på døren enn det du allerede har?  
                        Mål opp og teip slik at det blir lettere å posisjonere døren riktig.</p>
                    </Col>
                </Row>
                <Row>
                    <Col size={1}>
                        <Filters doorHook={doorHook}/>
                    </Col>
                    <Col size={3}>
                        <MainDoorControl doorHook={doorHook}/>
                    </Col>
                </Row>
                <Row>
                <Col size={1}>
                        <Controls doorHook={doorHook}/>
                        <p></p>
                        <OrderLink doorHook={doorHook}/>
                    </Col>
                    <Col size={3}>
                        <Display doorHook={doorHook}/>
                    </Col>
                </Row>
                
            </Grid>
            {/* <p>-----</p>
            <Controls doorHook={doorHook}/>
            <MainDoorControl doorHook={doorHook}/>
            <Display doorHook={doorHook}/>
            <OrderLink doorHook={doorHook}/> */}
        </AppWrapper>
    );
}

export default App;
