import React from 'react';
import styled from 'styled-components';
import Progress from 'react-native-progress/Bar';
import { Dimensions } from 'react-native';
import { brand_primary } from 'theme';

const { width } = Dimensions.get('window');

const ContainStyled = styled.View`
  padding: 20px 0;
  justify-content: center;
  align-items: center;
`;
export default function ProgressComponent() {
  return (
    <ContainStyled>
      <Progress
        indeterminate
        width={width * 0.6}
        useNativeDriver
        color={brand_primary}
      />
    </ContainStyled>
  );
}
