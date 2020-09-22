import React from 'react';
import {useState, useEffect} from 'react';
import {CloudinaryContext, Image} from 'cloudinary-react';
import axios from 'axios';
import useAxios from 'axios-hooks';
import {SelectedDoor} from './SelectedDoor';
import styled from 'styled-components';
import './ImageLoader.css'
const LoaderWrapper = styled.div `
    width: 100px;
    padding: 10px;
`


const ImageLoader = () => {
    const [
        {
            data,
            loading,
            error
        }, refetch
    ] = useAxios('https://res.cloudinary.com/dikc1xnkv/image/list/swedoor.json')

    if (loading) 
        return <p>Laster...</p>


    


    if (error) 
        return <p>Error!</p>


    


    console.log(data.resources);
    console.log({SelectedDoor})


    // const [images,setImages] = useState("[]")
    // const getImages = () => {
    //     axios.get('https://res.cloudinary.com/dikc1xnkv/image/list/swedoor.json')
    //         .then(res => {
    //             console.log(res.data.resources);
    //             setImages(res.data.resources);
    //         });
    // }

    // useEffect(()=>{
    //     console.log('component mounted!')
    // },[])

    return (
        <div className="imgImport">
            <LoaderWrapper>
                <div className="col-sm-12">
                    <CloudinaryContext cloudName="dikc1xnkv">
                        {
                        data.resources.map((data, public_id) => (
                            <div className="col-sm-4"
                                key={public_id}>
                                <div className="embed-responsive embed-responsive-4by3">
                                    <Image publicId={
                                            data.public_id
                                        }
                                        height="100"
                                        loading="lazy"
                                        quality="auto"
                                        controls></Image>
                                </div>
                                {/* <div> {
                                    data.public_id
                                } </div> */} </div>
                        ))
                    } </CloudinaryContext>
                </div>
            </LoaderWrapper>
        </div>
    );

}

export {
    ImageLoader
};
