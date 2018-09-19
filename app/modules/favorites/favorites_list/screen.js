import React from 'react';
import styled from 'styled-components';
import { Dimensions } from 'react-native';
import { FavoritesListTabs } from '@/favorites/favorites_list';

const { height } = Dimensions.get('window');

const ContainStyled = styled.View`
  background: #fff;
  min-height: ${height - 48};
`;

function FavoritesListScreen() {
  return (
    <ContainStyled>
      <FavoritesListTabs />
    </ContainStyled>);
}

export default FavoritesListScreen;
