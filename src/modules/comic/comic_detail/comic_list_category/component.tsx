import React from 'react';
import styled from 'styled-components/native';

import { brand_primary } from 'theme';

const ContainStyled = styled.View`
  padding-left: 10px;
  padding-top: 10px;
  background-color: #fff;
  height: 40px;
`;
const TitleStyled = styled.Text`
  font-size: 12px;
  color: #333;
  padding-left: 10px;
  border-left-width: 3px;
  border-left-color: ${brand_primary};
`;
function ComicListCategory({ children, dark }) {
  return (
    <ContainStyled style={dark && { backgroundColor: '#333' }}>
      <TitleStyled style={dark && { color: '#fff' }}>
        {children}
      </TitleStyled>
    </ContainStyled>
  );
}

ComicListCategory.defaultProps = {
  children: '',
  dark: false,
};
export default ComicListCategory;
