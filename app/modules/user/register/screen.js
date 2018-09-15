import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { StatusBar, Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { brand_primary } from 'theme';
import { Header } from 'router';
import { RegisterLocal } from '@/user/register';
import { Brand } from '@/user';


const { height } = Dimensions.get('window');

const ContainStyled = styled.View`
  min-height: ${height};
  background-color: #fff;
`;

class RegisterScreen extends PureComponent {
  static navigationOptions = {
    title: '注册',
    header: props => <Header {...props} />,
  };

  render() {
    return (
      <ContainStyled>
        <StatusBar barStyle="light-content" backgroundColor={brand_primary} />
        <KeyboardAwareScrollView
          enableOnAndroid
          enableAutomaticScroll
          keyboardShouldPersistTaps="always"
          extraScrollHeight={60}
          extraHeight={60}
        >
          <Brand />
          <RegisterLocal />
        </KeyboardAwareScrollView>
      </ContainStyled>
    );
  }
}

export default RegisterScreen;
