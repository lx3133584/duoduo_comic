import React from 'react';
import styled from 'styled-components';
import { Dimensions } from 'react-native';
import { FavoritesListTabs } from '@/favorites/favorites_list';

const { height } = Dimensions.get('window');

const ContainStyled = styled.view`
  background: #fff;
  min-height: ${height - 48};
`;

function FavoritesListScreen(props) {
  return (
    <ContainStyled>
      <FavoritesListTabs {...props} />
    </ContainStyled>);
}

export default FavoritesListScreen;
