import React from 'react';
import { StatusBar, Dimensions } from 'react-native';
import styled from 'styled-components';
import { brand_primary } from 'theme';
import { SearchBar, SearchList } from '@/search/search_list';

const { height } = Dimensions.get('window');

const ContainStyled = styled.View`
  background: #fff;
  min-height: ${height};
  padding-bottom: 125px;
`;

function SearchListScreen() {
  return (
    <ContainStyled>
      <StatusBar barStyle="light-content" backgroundColor={brand_primary} />
      <SearchBar />
      <SearchList />
    </ContainStyled>);
}

export default SearchListScreen;
