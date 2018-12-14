import React from 'react';
import styled from 'styled-components';
import { LeftButton, Header } from 'router';

const ContainStyled = styled.View`
  position: absolute;
  top: ${Header.statusBarHeight + 14};
  left: 0;
`;
function DetailBackButtonComponent() {
  return (
    <ContainStyled>
      <LeftButton />
    </ContainStyled>
  );
}

export default DetailBackButtonComponent;
