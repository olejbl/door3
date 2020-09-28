import React from 'react';
import './App.css';
import {Controls} from "./Components/Controls";
import {Display} from "./Components/Display";
import {useDoor} from "./Components/hooks";
import {OrderLink} from "./Components/OrderButton"
import styled from 'styled-components';

const AppWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

function App() {
    const doorHook = useDoor();
    return (
        <AppWrapper className="App">
            <Controls doorHook={doorHook}/>
            <Display doorHook={doorHook}/>
            <OrderLink doorHook={doorHook}/>
        </AppWrapper>
    );
}

export default App;
