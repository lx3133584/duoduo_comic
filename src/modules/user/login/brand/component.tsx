import React from 'react';
import styled from 'styled-components';
import { Image } from 'react-native';
import { brand_primary } from 'theme';

import logoImg from './logo.png';

const ContainStyled = styled.view`
  padding: 30px 0;
  justify-content: center;
  align-items: center;
`;
const ImageContainStyled = styled.view`
  background-color: ${brand_primary};
  border-radius: 999px;
  justify-content: center;
  align-items: center;
  width: 72;
  height: 72;
`;
const TextStyled = styled.text`
  margin: 10px 0;
  text-align: center;
  font-size: 20px;
  font-weight: 900;
  color: ${brand_primary};
`;
const imageStyle = {
  width: 60,
  height: 60,
};

function BrandComponent() {
  return (
    <ContainStyled>
      <ImageContainStyled>
        <Image
          source={logoImg}
          style={imageStyle}
          fallback
        />
      </ImageContainStyled>
      <TextStyled>
多多漫画
      </TextStyled>
    </ContainStyled>
  );
}

export default BrandComponent;
