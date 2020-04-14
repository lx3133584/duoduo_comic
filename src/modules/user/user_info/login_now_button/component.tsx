import React from 'react';

import { Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { brand_primary } from 'theme';

const buttonStyle = {
  backgroundColor: '#fff',
  width: 80,
  height: 30,
  borderColor: brand_primary,
  borderWidth: 1,
};
const textStyle = {
  fontSize: 12,
  color: brand_primary,
};
const largeStyle = {
  width: 120,
  height: 40,
};
const containerStyle = {
  justifyContent: 'center' as 'center',
  alignItems: 'center' as 'center',
};

function LoginNowButtonComponent({ large }) {
  return (
    <Button
      title="立即登录"
      containerStyle={containerStyle}
      titleStyle={[textStyle, large && { fontSize: 14 }]}
      buttonStyle={[buttonStyle, large && largeStyle]}
      onPress={Actions.login}
    />
  );
}

LoginNowButtonComponent.defaultProps = {
  large: false,
};
export default LoginNowButtonComponent;
