import React from 'react';
import styled from 'styled-components/native';
import Spinner from 'react-native-spinkit';
import { brand_primary } from 'theme';

const ContainStyled = styled.View`
  padding: 50px 0;
  justify-content: center;
  align-items: center;
`;
export default function ProgressComponent() {
  return (
    <ContainStyled>
      <Spinner
        type="ChasingDots"
        size={32}
        color={brand_primary}
      />
    </ContainStyled>
  );
}
