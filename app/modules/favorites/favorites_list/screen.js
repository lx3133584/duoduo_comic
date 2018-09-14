import React from 'react';
import styled from 'styled-components';
import { StatusBar, Dimensions } from 'react-native';
import { FavoritesListTabs } from '.';
import { brand_primary } from 'theme';

const { height } = Dimensions.get('window');

const ContainStyled = styled.View`
  background: #fff;
  min-height: ${height};
  padding-bottom: 72px;
`;

function FavoritesListScreen() {
  return (
    <ContainStyled>
      <StatusBar barStyle="light-content" backgroundColor={brand_primary} />
      <FavoritesListTabs />
    </ContainStyled>);
}

export default FavoritesListScreen;
