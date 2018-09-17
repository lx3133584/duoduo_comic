import React from 'react';
import { StatusBar, Dimensions } from 'react-native';
import styled from 'styled-components';
import { brand_primary } from 'theme';
import { ClassList, RankList } from '@/discovery/discovery_list';

const { height } = Dimensions.get('window');

const ContainStyled = styled.ScrollView`
  background: #fff;
  min-height: ${height};
`;

function DiscoveryListScreen() {
  return (
    <ContainStyled key="main">
      <StatusBar barStyle="light-content" backgroundColor={brand_primary} />
      <RankList />
      <ClassList />
    </ContainStyled>
  );
}

export default DiscoveryListScreen;
