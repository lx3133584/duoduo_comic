import React from 'react';
import styled from 'styled-components';
import { TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { Actions } from 'react-native-router-flux';
import { Header } from 'router';

const ContainStyled = styled.View`
  position: absolute;
  top: ${Header.statusBarHeight + 14};
  right: 0;
`;

const InnerContainStyled = styled.View`
  padding: 0 12px;
`;
const DownloadIcon = () => <Feather name="download" size={22} color="#fff" />;

function DetailRightButtonComponent() {
  return (
    <ContainStyled>
      <TouchableOpacity onPress={Actions.downloadSelect}>
        <InnerContainStyled>
          <DownloadIcon />
        </InnerContainStyled>
      </TouchableOpacity>
    </ContainStyled>
  );
}

export default DetailRightButtonComponent;
