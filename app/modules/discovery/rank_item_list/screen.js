import React, { PureComponent } from 'react';
import { StatusBar, Dimensions } from 'react-native';
import styled from 'styled-components';
import { RankItemList } from '@/discovery/rank_item_list';
import { brand_primary } from 'theme';

const { height } = Dimensions.get('window');

const ContainStyled = styled.View`
  background: #fff;
  min-height: ${height};
`;

class RankItemListScreen extends PureComponent {
  render() {
    return (
      <ContainStyled>
        <StatusBar barStyle="light-content" backgroundColor={brand_primary} />
        <RankItemList {...this.props} />
      </ContainStyled>
    );
  }
}

export default RankItemListScreen;
