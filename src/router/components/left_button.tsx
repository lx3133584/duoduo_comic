import React from 'react';
import { TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { Actions } from 'react-native-router-flux';
import styled from 'styled-components/native';

const ContainStyled = styled.View`
  padding: 0 10px;
`;

const BackIcon = () => <Entypo name="chevron-left" size={24} color="#fff" />;

function LeftButton({ containStyle }: { containStyle?: StyleProp<ViewStyle> }) {
  return (
    <TouchableOpacity onPress={() => Actions.pop()}>
      <ContainStyled style={containStyle}>
        <BackIcon />
      </ContainStyled>
    </TouchableOpacity>
  );
}

export default LeftButton;
