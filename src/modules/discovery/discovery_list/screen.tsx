import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import ClassList from './class_list';
import RankList from './rank_list';

const { height } = Dimensions.get('window');

const ContainStyled = styled.ScrollView`
  background: #fff;
  min-height: ${height};
`;

function DiscoveryListScreen() {
  return (
    <ContainStyled>
      <RankList />
      <ClassList />
    </ContainStyled>
  );
}

export default DiscoveryListScreen;
