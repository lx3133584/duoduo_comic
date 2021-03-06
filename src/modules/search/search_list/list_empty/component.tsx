import React from 'react';
import styled from 'styled-components/native';

import { Image } from 'react-native';

import noresImg from './nores.png';

const ContainStyled = styled.View`
  flex: 1;
  justify-content: space-around;
  align-items: center;
  height: 280px;
`;
const DescStyled = styled.Text`
  color: #999;
  font-size: 14px;
`;
const imageStyle = {
  width: 120,
  height: 120,
};

function ListEmptyComponent({ text }: { text: string }) {
  return (
    <ContainStyled>
      <Image
        source={noresImg}
        style={imageStyle}
        resizeMode="contain"
      />
      <DescStyled>
        {text}
      </DescStyled>
    </ContainStyled>
  );
}

ListEmptyComponent.defaultProps = {
  text: '这里什么都没有呢~',
};
export default ListEmptyComponent;
