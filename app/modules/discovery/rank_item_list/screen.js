import React, { PureComponent } from 'react';
import { StatusBar, Dimensions } from 'react-native';
import styled from 'styled-components';
import { RankItemList } from '.';
import { rankTypes } from '..';
import { brand_primary } from 'theme';
import { Header } from 'router';

const { height } = Dimensions.get('window');

const ContainStyled = styled.View`
  background: #fff;
  min-height: ${height};
`;

class RankItemListScreen extends PureComponent {
  static navigationOptions({ navigation }) {
    const { type = 0 } = navigation.state.params;
    const { name } = rankTypes[type];
    return {
      title: '排行榜',
      header: props => <Header {...props} customTitle={name} />,
    };
  }

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
