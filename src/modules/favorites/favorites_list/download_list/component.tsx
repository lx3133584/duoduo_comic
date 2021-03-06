import React, { Component } from 'react';

import { is } from 'immutable';
import DownloadListItem from '../download_list_item';
import Modal from '../modal';
import styled from 'styled-components/native';
import { LongList } from '@';
import { IContainer } from './container';

const ContainStyled = styled.View`
`;

class DownloadListComponent extends Component<IContainer> {
  id: number = null;

  state = {
    isVisible: false,
  };

  constructor(props) {
    super(props);
    this.removeDownload = this.removeDownload.bind(this);
    this.confirm = this.confirm.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { list } = this.props;
    const { isVisible } = this.state;
    return !is(nextProps.list, list) || isVisible !== nextState.isVisible;
  }

  cancel() {
    this.setState({ isVisible: false });
  }

  confirm() {
    const { remove } = this.props;
    this.setState({ isVisible: false });
    remove(this.id);
  }

  removeDownload(id) {
    this.setState({ isVisible: true });
    this.id = id;
  }

  render() {
    const { list } = this.props;
    const listFormat = list.toArray();
    const { isVisible } = this.state;
    return (
      <ContainStyled>
        <LongList
          list={listFormat}
          Item={DownloadListItem}
          itemOnLongPress={this.removeDownload}
          showFooter
        />
        <Modal
          confirm={this.confirm}
          cancel={this.cancel}
          isVisible={isVisible}
        >
           是否确认删除本地缓存？
        </Modal>
      </ContainStyled>
    );
  }
}

export default DownloadListComponent;
