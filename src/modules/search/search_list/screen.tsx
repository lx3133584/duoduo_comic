import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components';
import { SearchBar, SearchList } from '@/search/search_list';

const { height } = Dimensions.get('window');

const ContainStyled = styled.view`
  background: #fff;
  min-height: ${height - 48};
  padding-bottom: 48px;
`;

function SearchListScreen() {
  return (
    <ContainStyled>
      <SearchBar />
      <SearchList />
    </ContainStyled>);
}

export default SearchListScreen;
