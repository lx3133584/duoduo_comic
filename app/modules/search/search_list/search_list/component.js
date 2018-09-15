import React, { PureComponent } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import { LongList, SearchListItem } from '@/search/search_list';

class SearchListComponent extends PureComponent {
  static propTypes = {
    search: PropTypes.func.isRequired,
    list: ImmutablePropTypes.list.isRequired,
    keyword: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.onFetch = this.onFetch.bind(this);
  }

  async onFetch(page) {
    const { keyword, search } = this.props;
    if (!keyword) return;
    await search({ page, keyword });
  }

  render() {
    const { list } = this.props;
    const listFormat = list.toJS();
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
