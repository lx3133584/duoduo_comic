import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Image } from 'react-native';

import noresImg from './nores.png';

const ContainStyled = styled.view`
  flex: 1;
  justify-content: space-around;
  align-items: center;
  height: 280px;
`;
const DescStyled = styled.text`
  color: #999;
  font-size: 14px;
`;
const imageStyle = {
  width: 120,
  height: 120,
};

function ListEmptyComponent({ text }) {
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
ListEmptyComponent.propTypes = {
  text: PropTypes.string,
};
ListEmptyComponent.defaultProps = {
  text: '这里什么都没有呢~',
};
export default ListEmptyComponent;
