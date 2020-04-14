import React, { Component } from 'react';

import { is } from 'immutable';
import FavoritesListItem from '../favorites_list_item';
import Modal from '../modal';
import styled from 'styled-components/native';
import { LongList } from '@';
import { IContainer } from './container';

const ContainStyled = styled.View`
`;

class FavoritesListComponent extends Component<IContainer> {
  id: number = null;

  state = {
    isVisible: false,
  };

  constructor(props) {
    super(props);
    this.onFetch = this.onFetch.bind(this);
    this.removeFavorite = this.removeFavorite.bind(this);
    this.confirm = this.confirm.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { list } = this.props;
    const { isVisible } = this.state;
    return !is(nextProps.list, list) || isVisible !== nextState.isVisible;
  }

  onFetch() {
    const { getList } = this.props;
    return getList() as any;
  }

  removeFavorite(id) {
    this.setState({ isVisible: true });
    this.id = id;
  }

  confirm() {
    const { remove } = this.props;
    this.setState({ isVisible: false });
    remove(this.id);
  }

  cancel() {
    this.setState({ isVisible: false });
  }

  render() {
    const { list } = this.props;
    const listFormat = list.toArray();
    const { isVisible } = this.state;
    return (
      <ContainStyled>
        <LongList
          list={listFormat}
          Item={FavoritesListItem}
          itemOnLongPress={this.removeFavorite}
          onFetch={this.onFetch}
          numColumns={3}
        />
        <Modal
          confirm={this.confirm}
          cancel={this.cancel}
          isVisible={isVisible}
        >
           是否确认删除收藏？
        </Modal>
      </ContainStyled>
    );
  }
}

export default FavoritesListComponent;
