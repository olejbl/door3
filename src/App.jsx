import React from 'react';
import './App.css';
import {Controls} from "./Components/Controls";
import {Display} from "./Components/Display";
import {useDoor} from "./Components/hooks";
import ImageUpload from './Components/ImageUpload';
import {ImageLoader} from './Components/ImageLoader';
import {SelectedDoor} from './Components/SelectedDoor';
import {
    Box,
    Card,
    Image,
    Heading,
    Text
} from 'rebass'

function App() {
    const doorHook = useDoor();
    return (
        <div className="App">
            <Controls doorHook={doorHook}/>
            <Display doorHook={doorHook}/>
            <ImageLoader/>
            <Box width={900}>
                <Card sx={
                    {
                        p: 1,
                        borderRadius: 2,
                        boxShadow: '0 0 16px rgba(0, 0, 0, .25)',
                        overflow: 'hidden'
                    }
                }>
                    <Heading as='h3'>
                        La deg inspirere!
                    </Heading>π
                    <ImageUpload/>
                    <Box px={2}>

                        <Text fontSize={0}>
                            Swedoor doors
                        </Text>
                    </Box>
                </Card>
            </Box>
        </div>
    );
}

export default App;
