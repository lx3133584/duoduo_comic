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
const SubTitleStyled = styled.Text`
  font-size: 18px;
  color: #eee;
`;
function ImagePlaceholder({ title, subTitle, ...otherProps }) {
  return (
    <ContainStyled {...otherProps}>
      <TitleStyled>
        {title}
      </TitleStyled>
      <SubTitleStyled>
        {subTitle}
      </SubTitleStyled>
    </ContainStyled>
  );
}
ImagePlaceholder.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
};
ImagePlaceholder.defaultProps = {
  title: '',
  subTitle: '',
};
export default ImagePlaceholder;
