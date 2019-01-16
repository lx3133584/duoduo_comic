import React from 'react';
import { Dimensions } from 'react-native';
import { Main, Footer } from '.';
import styled from 'styled-components';

const { height } = Dimensions.get('window');

const ContainStyled = styled.View`
  background: #fff;
  min-height: ${height};
  padding-bottom: ${70 + Footer.height};
`;

function DownloadSelectScreen() {
  return (
    <ContainStyled>
      <Main />
    </ContainStyled>
  );
}

export default DownloadSelectScreen;
