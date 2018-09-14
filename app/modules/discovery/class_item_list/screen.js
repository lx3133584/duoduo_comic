import React, { PureComponent } from 'react';
import { StatusBar, Dimensions } from 'react-native';
import styled from 'styled-components';
import { ClassItemList } from '.';
import { brand_primary } from 'theme';
import { Header } from 'router';

const { height } = Dimensions.get('window');

const ContainStyled = styled.View`
  background: #fff;
  min-height: ${height};
`;

class ClassItemListScreen extends PureComponent {
  static navigationOptions({ navigation }) {
    const { name } = navigation.state.params;
    return {
      title: '分类',
      header: props => <Header {...props} customTitle={name} />,
    };
  }

  render() {
    return (
      <ContainStyled>
        <StatusBar barStyle="light-content" backgroundColor={brand_primary} />
        <ClassItemList />
      </ContainStyled>
    );
  }
}

export default ClassItemListScreen;
