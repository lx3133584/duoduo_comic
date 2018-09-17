import React, { PureComponent } from 'react';
import { StatusBar, Dimensions } from 'react-native';
import styled from 'styled-components';
import { brand_primary } from 'theme';
import { ClassItemList } from '@/discovery/class_item_list';

const { height } = Dimensions.get('window');

const ContainStyled = styled.View`
  background: #fff;
  min-height: ${height};
`;

class ClassItemListScreen extends PureComponent {
  render() {
    return (
      <ContainStyled>
        <StatusBar barStyle="light-content" backgroundColor={brand_primary} />
        <ClassItemList {...this.props} />
      </ContainStyled>
    );
  }
}

export default ClassItemListScreen;
