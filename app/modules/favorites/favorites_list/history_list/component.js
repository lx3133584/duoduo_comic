import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import { HistoryListItem, Modal } from '@/favorites/favorites_list';
import styled from 'styled-components';
import { LongList } from '@';

const ContainStyled = styled.View`
  padding-top: 15px;
`;

class FavoritesListComponent extends Component {
  static propTypes = {
    getList: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    list: ImmutablePropTypes.list.isRequired,
  };

  constructor(props) {
    super(props);
    this.onFetch = this.onFetch.bind(this);
    this.removeFavorite = this.removeFavorite.bind(this);
    this.confirm = this.confirm.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  state = {
    isVisible: false,
  };

  componentDidMount() {
    this.onFetch(0);
  }

  shouldComponentUpdate(nextProps) {
    const { list } = this.props;
    return nextProps.list !== list;
  }

  async onFetch(page) {
    const { getList } = this.props;
    await getList(page);
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
    const listFormat = list.toJS();
    const { isVisible } = this.state;
    return (
      <ContainStyled>
        <LongList
          list={listFormat}
          Item={HistoryListItem}
          itemOnLongPress={this.removeFavorite}
          onFetch={this.onFetch}
          isLong
          showFooter
        />
        <Modal
          confirm={this.confirm}
          cancel={this.cancel}
          isVisible={isVisible}
        >
           是否确认删除此条浏览记录？
        </Modal>
      </ContainStyled>
    );
  }
}

export default FavoritesListComponent;
