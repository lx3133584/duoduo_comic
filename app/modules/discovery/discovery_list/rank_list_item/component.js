import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { TouchableOpacity, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const containWidth = width / 2 - 25;

const ContainStyled = styled.View`
  margin: 10px 12px;
  width: ${containWidth};
  height: 50px;
  border-radius: 10px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const TitleStyled = styled.Text`
  margin-left: 5px;
  color: #fff;
  font-size: 16px;
`;
function RankListItem({
  id, name, color, Icon,
}) {
  return (
    <TouchableOpacity
      onPress={() => Actions.rankItem({ type: id })}
      activeOpacity={0.6}
    >
      <ContainStyled style={{ backgroundColor: color }}>
        <Icon />
        <TitleStyled>
          {name}
        </TitleStyled>
      </ContainStyled>
    </TouchableOpacity>
  );
}
RankListItem.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  Icon: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
};
export default RankListItem;
