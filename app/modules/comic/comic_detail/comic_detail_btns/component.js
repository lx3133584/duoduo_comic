import React, { PureComponent } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { brand_primary } from 'theme';
import { Modal } from '@';
import { numberFormat } from 'utils';

const { width } = Dimensions.get('window');

const ContainStyled = styled.View`
  height: 60px;
  background-color: #fff;
  justify-content: space-around;
  flex-direction: row;
  width: ${width};
`;
const CollectionContainStyled = styled.View`
  justify-content: center;
  width: ${width / 2 - 20};
`;
const CollectionStyled = styled.View`
  flex-direction: row;
  justify-content: center;
`;
const CollectionTextStyled = styled.Text`
  color: #666;
  font-size: 14px;
  margin-left: 8px;
`;
const CollectionNumberStyled = styled.Text`
  font-size: 12px;
`;
const startTextStyle = {
  color: '#fff',
};
const startButtonStyle = {
  backgroundColor: brand_primary,
  borderWidth: 0,
  borderRadius: 100,
  width: width / 2 - 20,
};
const containerStyle = {
  justifyContent: 'center',
  alignItems: 'center',
};

class ComicDetailBtnsComponent extends PureComponent {
  static propTypes = {
    detail: ImmutablePropTypes.map.isRequired,
    list: ImmutablePropTypes.list.isRequired,
    add: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.startRead = this.startRead.bind(this);
    this.addFavorite = this.addFavorite.bind(this);
    this.removeFavorite = this.removeFavorite.bind(this);
    this.confirm = this.confirm.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  state = {
    isVisible: false,
  };

  removeFavorite() {
    this.setState({ isVisible: true });
  }

  confirm() {
    const { detail, remove } = this.props;
    this.setState({ isVisible: false });
    const id = detail.get('id');
    remove(id);
  }

  cancel() {
    this.setState({ isVisible: false });
  }

  addFavorite() {
    const { detail, add } = this.props;
    const id = detail.get('id');
    add(id);
  }

  startRead() {
    const { detail, list } = this.props;
    let chapter_id = detail.get('chapter_id');
    let cur_chapter = detail.get('cur_chapter');
    if (!chapter_id && list.size) {
      const { id, title } = list.get(0).data[0];
      chapter_id = id;
      cur_chapter = title;
    }
    Actions.comicContent({ chapter_id, title: cur_chapter, pre: false });
  }

  render() {
    const { detail } = this.props;
    const { isVisible } = this.state;
    const favorite_id = detail.get('favorite_id');
    const collection_number = detail.get('collection_number');
    const chapter_id = detail.get('chapter_id');
    return (
      <ContainStyled>
        <CollectionContainStyled>
          <TouchableOpacity activeOpacity={0.6} onPress={favorite_id ? this.removeFavorite : this.addFavorite}>
            <CollectionStyled>
              <Icon
                name={favorite_id ? 'heart' : 'heart-o'}
                size={18}
                color={brand_primary}
              />
              <CollectionTextStyled>
                {favorite_id ? '已' : ''}
收藏
                {' '}
                <CollectionNumberStyled>
(
                  {numberFormat(collection_number)}
)
                </CollectionNumberStyled>
              </CollectionTextStyled>
            </CollectionStyled>
          </TouchableOpacity>
        </CollectionContainStyled>
        <Button
          containerStyle={containerStyle}
          titleStyle={startTextStyle}
          buttonStyle={startButtonStyle}
          onPress={this.startRead}
          title={chapter_id ? '续看' : '开始阅读'}
        />
        <Modal
          confirm={this.confirm}
          cancel={this.cancel}
          isVisible={isVisible}
        >

          是否确认取消收藏？
        </Modal>
      </ContainStyled>
    );
  }
}

export default ComicDetailBtnsComponent;
