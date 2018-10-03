import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import { is } from 'immutable';
import { DownloadListItem, Modal } from '@/favorites/favorites_list';
import styled from 'styled-components';
import { LongList } from '@';

const ContainStyled = styled.View`
`;

class DownloadListComponent extends Component {
  static propTypes = {
    remove: PropTypes.func.isRequired,
    list: ImmutablePropTypes.list.isRequired,
  };

  constructor(props) {
    super(props);
    this.removeDownload = this.removeDownload.bind(this);
    this.confirm = this.confirm.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  state = {
    isVisible: false,
  };

  shouldComponentUpdate(nextProps) {
    const { list } = this.props;
    return !is(nextProps.list, list);
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
