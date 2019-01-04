import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components';
import { ClassList, RankList } from '.';

const { height } = Dimensions.get('window');

const ContainStyled = styled.ScrollView`
  background: #fff;
  min-height: ${height};
`;

function DiscoveryListScreen() {
  return (
    <ContainStyled key="main">
      <RankList />
      <ClassList />
    </ContainStyled>
  );
}

export default DiscoveryListScreen;
