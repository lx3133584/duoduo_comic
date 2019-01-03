import React from 'react';
import styled from 'styled-components';
import { RankListItem, rankTypes } from '@/discovery/discovery_list';

const ContainStyled = styled.View`
  margin: 10px 0;
  justify-content: space-around;
  flex-direction: row;
  flex-wrap: wrap;
`;

export default function RankListComponent() {
  return (
    <ContainStyled>
      {rankTypes.map(item => <RankListItem {...item} />)}
    </ContainStyled>
  );
}
