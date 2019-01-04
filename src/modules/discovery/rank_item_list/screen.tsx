import React, { PureComponent } from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components';
import { RankItemList } from '@/discovery/rank_item_list';

const { height } = Dimensions.get('window');

const ContainStyled = styled.view`
  background: #fff;
  min-height: ${height};
`;

class RankItemListScreen extends PureComponent {
  render() {
    return (
      <ContainStyled>
        <RankItemList {...this.props} />
      </ContainStyled>
    );
  }
}

export default RankItemListScreen;
