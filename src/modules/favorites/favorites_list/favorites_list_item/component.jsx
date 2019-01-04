import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { TouchableOpacity, Dimensions } from 'react-native';
import { Image } from '@';

const { width } = Dimensions.get('window');

const contentWidth = width / 3 - 25;
const ContainStyled = styled.view`
  margin: 5px 12px;
  width: ${contentWidth};
`;
const BottomStyled = styled.view`
  margin-top: 8px;
`;
const TitleStyled = styled.text`
  color: #000;
  font-size: 12px;
`;
const DescStyled = styled.text`
  color: #999;
  font-size: 10px;
`;
const imageStyle = {
  width: contentWidth,
  height: contentWidth * 3 / 2,
};
function FavoritesListItem({
  title, cover, itemOnLongPress, id, cur_chapter,
}) {
  return (
    <ContainStyled>
      <TouchableOpacity
        activeOpacity={0.6}
        onLongPress={() => itemOnLongPress(id)}
        onPress={() => Actions.comicDetail({ id, index: 1 })}
      >
        <Image
          source={{ uri: cover }}
          imageStyle={imageStyle}
        />
      </TouchableOpacity>
      <BottomStyled>
        <TitleStyled>
          {title}
        </TitleStyled>
        <DescStyled>
          {cur_chapter || '未看'}
        </DescStyled>
      </BottomStyled>
    </ContainStyled>
  );
}
FavoritesListItem.propTypes = {
  title: PropTypes.string,
  cover: PropTypes.string,
  itemOnLongPress: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  cur_chapter: PropTypes.string,
};
FavoritesListItem.defaultProps = {
  title: '',
  cover: '',
  cur_chapter: '',
};
export default FavoritesListItem;
