import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ContainStyled = styled.View`
  background-color: #999;
  justify-content: center;
  align-items: center;
`;
const TitleStyled = styled.Text`
  font-size: 32px;
  color: #eee;
`;
function ImagePlaceholder({ children, ...otherProps }) {
  return (
    <ContainStyled {...otherProps}>
      <TitleStyled>
        {children}
      </TitleStyled>
    </ContainStyled>
  );
}
ImagePlaceholder.propTypes = {
  children: PropTypes.number,
};
ImagePlaceholder.defaultProps = {
  children: null,
};
export default ImagePlaceholder;
