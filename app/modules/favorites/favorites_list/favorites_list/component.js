import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import { FavoritesListItem, Modal } from '@/favorites/favorites_list';
import styled from 'styled-components';
import { LongList } from '@';

const ContainStyled = styled.View`
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
    this.onFetch();
  }

  shouldComponentUpdate(nextProps) {
    const { list } = this.props;
    return nextProps.list !== list;
  }

  async onFetch() {
    const { getList } = this.props;
    await getList();
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
    const listFormat = list.toJS();
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
