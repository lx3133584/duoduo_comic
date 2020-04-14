import React from 'react';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Brand, LoginLocal } from '@/user/login';

const { height } = Dimensions.get('window');

const ContainStyled = styled.View`
  min-height: ${height};
  background-color: #fff;
`;

function LoginScreen() {
  return (
    <ContainStyled>
      <KeyboardAwareScrollView
        enableOnAndroid
        enableAutomaticScroll
        extraScrollHeight={60}
        keyboardShouldPersistTaps="always"
        extraHeight={60}
      >
        <Brand />
        <LoginLocal />
      </KeyboardAwareScrollView>
    </ContainStyled>
  );
}

export default LoginScreen;
