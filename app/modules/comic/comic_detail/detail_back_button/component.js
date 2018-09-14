import React from 'react';
import styled from 'styled-components';
import { LeftButton } from 'router';

const ContainStyled = styled.View`
  position: absolute;
  top: 28;
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
