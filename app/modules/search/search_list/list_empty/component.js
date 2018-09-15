import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Image } from '@/search/search_list';

import noresImg from './nores.png';

const ContainStyled = styled.View`
  flex: 1;
  justify-content: space-around;
  align-items: center;
  height: 300px;
`;
const ImageContainStyled = styled.View`
  padding-right: 80px;
`;
const DescStyled = styled.Text`
  color: #999;
  font-size: 14px;
`;
const imageStyle = {
  width: 80,
  height: 80,
};

function ListEmptyComponent({ text }) {
  return (
    <ContainStyled>
      <ImageContainStyled>
        <Image
          source={noresImg}
          imageStyle={imageStyle}
        />
      </ImageContainStyled>
      <DescStyled>
        {text}
      </DescStyled>
    </ContainStyled>
  );
}
ListEmptyComponent.propTypes = {
  text: PropTypes.string,
};
ListEmptyComponent.defaultProps = {
  text: '这里什么都没有呢~',
};
export default ListEmptyComponent;
