import React, { PureComponent } from 'react';

import { LongList, LoadingPage, SearchListItem } from '@';
import { wrapWithLoading, ILoadingProps } from 'utils';
import { IContainer } from './container';

@wrapWithLoading
class ClassItemListComponent extends PureComponent<IContainer & ILoadingProps> {

  static defaultProps = {
    id: 0,
  };

  constructor(props) {
    super(props);
    this.onFetch = this.onFetch.bind(this);
  }

  componentDidMount() {
    const { hideLoading } = this.props;
    (this.onFetch(0) as any).finally(() => {
      hideLoading();
    });
  }

  onFetch(page) {
    const { getList, id } = this.props;
    return getList({ page, id }) as any;
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
