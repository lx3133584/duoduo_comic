import React from 'react';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import FavoritesListTabs from './favorites_list_tabs';
import { SearchIcon } from '@';
import { statusBarHeight } from 'theme';

const { height } = Dimensions.get('window');

const ContainStyled = styled.View`
  background: #fff;
  min-height: ${height - 48};
`;
const RightIconStyle = styled.View`
  position: absolute;
  right: 10px;
  top: ${statusBarHeight + 20};
`;

function FavoritesListScreen(props) {
  return (
    <ContainStyled>
      <FavoritesListTabs {...props} />
      <RightIconStyle>
        <SearchIcon />
      </RightIconStyle>
    </ContainStyled>);
}

export default FavoritesListScreen;
