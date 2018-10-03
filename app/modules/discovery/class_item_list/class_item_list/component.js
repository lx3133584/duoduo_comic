import React, { PureComponent } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import { LongList, LoadingPage, SearchListItem } from '@';
import { wrapWithLoading } from 'utils';

@wrapWithLoading
class ClassItemListComponent extends PureComponent {
  static propTypes = {
    getList: PropTypes.func.isRequired,
    hideLoading: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    list: ImmutablePropTypes.list.isRequired,
    id: PropTypes.number,
  };

  static defaultProps = {
    id: 0,
  }

  constructor(props) {
    super(props);
    this.onFetch = this.onFetch.bind(this);
  }

  componentDidMount() {
    this.onFetch(0);
  }

  async onFetch(page) {
    const { getList, hideLoading, id } = this.props;
    const res = await getList({ page, id });
    hideLoading();
    return res;
  }

  render() {
    const { loading, list } = this.props;
    const listFormat = list.toArray();
    return ([
      <LoadingPage show={loading} key="loading" />,
      <LongList
        key="main"
        list={listFormat}
        Item={SearchListItem}
        onFetch={this.onFetch}
        isLong
        showFooter
      />,
    ]);
  }
}

export default ClassItemListComponent;
