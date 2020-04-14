import React, { PureComponent } from 'react';

import LongList from '../long_list';
import SearchListItem from '../search_list_item';
import { IContainer } from './container';

class SearchListComponent extends PureComponent<IContainer> {

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
        onFetch={this.onFetch as any}
        emptyText="试着搜索看看吧~"
        isLong
        showFooter
      />
    );
  }
}

export default SearchListComponent;
