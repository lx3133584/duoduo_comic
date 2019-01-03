import React, { PureComponent } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import { LongList, LoadingPage, SearchListItem } from '@';
import { wrapWithLoading, wrapWithLoadingType } from 'utils';

@wrapWithLoading
class ClassItemListComponent extends PureComponent {
  static propTypes = {
    getList: PropTypes.func.isRequired,
    list: ImmutablePropTypes.list.isRequired,
    id: PropTypes.number,
    ...wrapWithLoadingType,
  };

  static defaultProps = {
    id: 0,
  }

  constructor(props) {
    super(props);
    this.onFetch = this.onFetch.bind(this);
  }

  componentDidMount() {
    const { hideLoading } = this.props;
    this.onFetch(0).finally(() => {
      hideLoading();
    });
  }

  onFetch(page) {
    const { getList, id } = this.props;
    return getList({ page, id });
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
