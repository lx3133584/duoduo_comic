import React, { PureComponent } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import { LongList, SearchListItem } from '..';
import { ContainerType } from './container';

class SearchListComponent extends PureComponent<ContainerType> {
  static propTypes = {
    search: PropTypes.func.isRequired,
    clear: PropTypes.func.isRequired,
    list: ImmutablePropTypes.list.isRequired,
    keyword: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.onFetch = this.onFetch.bind(this);
  }

  componentWillUnmount() {
    const { clear } = this.props;
    clear();
  }

  onFetch(page: number) {
    const { keyword, search } = this.props;
    if (!keyword) return;
    return search({ page, keyword });
  }

  render() {
    const { list } = this.props;
    const listFormat = list.toArray();
    return (
      <LongList
        list={listFormat}
        Item={SearchListItem}
        onFetch={this.onFetch}
        emptyText="试着搜索看看吧~"
        isLong
        showFooter
      />
    );
  }
}

export default SearchListComponent;
