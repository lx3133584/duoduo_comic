import React from 'react';
import styled from 'styled-components/native';

import Spinner from 'react-native-spinkit';
import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

const ContainerStyled = styled.View`
  height: ${height};
  width: ${width};
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.4);
`;

function SpinComponent({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <ContainerStyled>
      <Spinner
        type="Pulse"
        color="#fff"
        size={96}
      />
    </ContainerStyled>
  );
}

SpinComponent.defaultProps = {
  show: false,
};
export default SpinComponent;
