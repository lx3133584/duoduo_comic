import React from 'react';

import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components/native';
import { brand_primary, red } from 'theme';

const ContainStyled = styled.View`
  margin: 5px 40px;
`;

const textStyle = {
  fontSize: 14,
};
const containerStyle = {
  borderBottomColor: brand_primary,
};

function LoginInputComponent({
  password, errorMessage, iconName, placeholder, value, onChange, onSubmit,
}) {
  return (
    <ContainStyled>
      <Input
        value={value}
        placeholder={placeholder || '请输入'}
        maxLength={32}
        shake
        autoCapitalize="none"
        inputStyle={textStyle}
        inputContainerStyle={containerStyle}
        secureTextEntry={password}
        onChangeText={onChange}
        onSubmitEditing={onSubmit}
        errorStyle={{ color: red }}
        errorMessage={errorMessage || null}
        leftIcon={(
          <Icon
            name={iconName}
            size={24}
            color={brand_primary}
          />
)}
      />
    </ContainStyled>
  );
}

LoginInputComponent.defaultProps = {
  password: false,
  errorMessage: null,
  iconName: 'user',
  placeholder: '请输入',
};
export default LoginInputComponent;
