import React from 'react';

import { Button } from 'react-native-elements';
import { brand_primary } from 'theme';

const buttonStyle = {
  backgroundColor: brand_primary,
  width: 300,
  height: 40,
  borderRadius: 100,
  marginTop: 10,
  borderWidth: 1,
  borderColor: brand_primary,
};
const textStyle = {
  fontSize: 14,
  color: '#fff',
  textAlign: 'justify' as 'justify',
};
const containerStyle = {
  justifyContent: 'center' as 'center',
  alignItems: 'center' as 'center',
};

function LoginButtonComponent({
  text, loading, onPress, outline, disabled,
}) {
  return (
    <Button
      title={text}
      loading={loading}
      disabled={disabled}
      containerStyle={containerStyle}
      titleStyle={[textStyle, outline && { color: brand_primary }]}
      buttonStyle={[buttonStyle, outline && { backgroundColor: '#fff' }]}
      onPress={onPress}
    />
  );
}

LoginButtonComponent.defaultProps = {
  text: '登  录',
  loading: false,
  outline: false,
  disabled: false,
};
export default LoginButtonComponent;
