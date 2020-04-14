import React, { Component } from 'react';

import { is } from 'immutable';
import HistoryListItem from '../history_list_item';
import Modal from '../modal';
import { LongList } from '@';
import { IContainer } from './container';

class HistoryListComponent extends Component<IContainer> {
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

  componentDidMount() {
    this.onFetch(0);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { list } = this.props;
    const { isVisible } = this.state;
    return !is(nextProps.list, list) || isVisible !== nextState.isVisible;
  }

  onFetch(page) {
    const { getList } = this.props;
    return getList(page);
  }

  cancel() {
    this.setState({ isVisible: false });
  }

  confirm() {
    const { remove } = this.props;
    this.setState({ isVisible: false });
    remove(this.id);
  }

  removeFavorite(id) {
    this.setState({ isVisible: true });
    this.id = id;
  }

  render() {
    const { list } = this.props;
    const listFormat = list.toArray();
    const { isVisible } = this.state;
    return [
      <LongList
        key="list"
        list={listFormat}
        Item={HistoryListItem}
        itemOnLongPress={this.removeFavorite}
        onFetch={this.onFetch}
        isLong
        showFooter
      />,
      <Modal
        key="modal"
        confirm={this.confirm}
        cancel={this.cancel}
        isVisible={isVisible}
      >
          是否确认删除此条浏览记录？
      </Modal>,
    ];
  }
}

export default HistoryListComponent;
