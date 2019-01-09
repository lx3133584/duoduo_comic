import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Dimensions } from 'react-native';
import Button from 'apsl-react-native-button';
import { brand_primary } from 'theme';

const { width: screenWidth } = Dimensions.get('window');

const height = 50;
const ContainerStyled = styled.view`
  height: ${height};
  width: ${screenWidth};
  background-color: #fff;
  flex-direction: row;
  align-items: center;
  position: absolute;
  bottom: 0;
`;

const buttonStyle = {
  position: 'absolute',
  right: 0,
  top: 0,
  width: screenWidth * 0.4,
  borderWidth: 0,
  borderRadius: 0,
  height,
  backgroundColor: brand_primary,
};
const textStyle = {
  color: '#fff',
};

function FooterComponent({
  children,
  onPress,
  buttonText,
  bottom,
}) {
  return (
    <ContainerStyled style={{ bottom }}>
      {children}
      <Button onPress={onPress} style={buttonStyle} textStyle={textStyle}>{buttonText}</Button>
    </ContainerStyled>
  );
}

FooterComponent.propTypes = {
  children: PropTypes.element,
  onPress: PropTypes.func,
  buttonText: PropTypes.string,
  bottom: PropTypes.number,
};
FooterComponent.defaultProps = {
  children: null,
  onPress: () => null,
  buttonText: '提交',
  bottom: 0,
};

FooterComponent.height = height;

export default FooterComponent;
