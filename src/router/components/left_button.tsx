import React from 'react';
import { TouchableOpacity } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { Actions } from 'react-native-router-flux';
import styled from 'styled-components';

const ContainStyled = styled.view`
  padding: 0 10px;
`;

const BackIcon = () => <Entypo name="chevron-left" size={24} color="#fff" />;

function LeftButton() {
  return (
    <TouchableOpacity onPress={Actions.pop}>
      <ContainStyled>
        <BackIcon />
      </ContainStyled>
    </TouchableOpacity>
  );
}

export default LeftButton;
