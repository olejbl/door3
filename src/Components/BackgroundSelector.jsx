import React from 'react';
import styled from 'styled-components';

const BackgroundImages = styled.div`
  & img {
    width: 10em;
    height: 10em;
    object-fit: cover;
  }
`;

const BackgroundSelector = ({doorHook}) => {
  const {setBackground} = doorHook;
  const handleClick = (img) => {
    setBackground(img);
    console.log("imageclick")
  } 
  return (
    <BackgroundImages>
      <p></p>
      <img src="https://res.cloudinary.com/dikc1xnkv/image/upload/v1604059183/eksempelbilde_fndqha.jpg" onClick={() => handleClick("https://res.cloudinary.com/dikc1xnkv/image/upload/v1604059183/eksempelbilde_fndqha.jpg")}></img>
      <img src="https://res.cloudinary.com/dikc1xnkv/image/upload/v1606226007/Tower-sort-Olvik_ak9oyj.jpg" onClick={() => handleClick("https://res.cloudinary.com/dikc1xnkv/image/upload/v1606226007/Tower-sort-Olvik_ak9oyj.jpg")}></img>
      <img src="https://res.cloudinary.com/dikc1xnkv/image/upload/v1606226142/Indus-hytte-i-Lofoten_t6cmba.jpg" onClick={() => handleClick("https://res.cloudinary.com/dikc1xnkv/image/upload/v1606226142/Indus-hytte-i-Lofoten_t6cmba.jpg")}></img>
      <img src="https://res.cloudinary.com/dikc1xnkv/image/upload/v1606226494/Beat_qhkysr.jpg" onClick={() => handleClick("https://res.cloudinary.com/dikc1xnkv/image/upload/v1606226494/Beat_qhkysr.jpg")}></img>
      <img src="https://res.cloudinary.com/dikc1xnkv/image/upload/v1606226612/digits-blue-scenery_mljd88.jpg" onClick={() => handleClick("https://res.cloudinary.com/dikc1xnkv/image/upload/v1606226612/digits-blue-scenery_mljd88.jpg")}></img>
    </BackgroundImages>
  );
}
export {BackgroundSelector};