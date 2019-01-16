import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components';
import { SearchBar, SearchList } from '.';

const { height } = Dimensions.get('window');

const ContainStyled = styled.View`
  background: #fff;
  min-height: ${height};
  padding-bottom: 48px;
`;

function SearchListScreen(props) {
  return (
    <ContainStyled>
      <SearchBar {...props} />
      <SearchList {...props} />
    </ContainStyled>);
}

export default SearchListScreen;
