import React, { PureComponent } from 'react';

import { RankItemListItem } from '@/discovery/rank_item_list';
import styled from 'styled-components/native';
import { LongList, LoadingPage } from '@';
import { wrapWithLoading, ILoadingProps } from 'utils';
import { IContainer } from './container';

const ContainStyled = styled.View`
  padding-bottom: 72px;
`;
@wrapWithLoading
class RankItemListComponent extends PureComponent<IContainer & ILoadingProps> {

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

  renderItem = (props) => {
    const { id } = this.props;
    return <RankItemListItem {...props} outid={id} />;
  }

  render() {
    const { list, loading } = this.props;
    const listFormat = list.toArray();
    return ([
      <LoadingPage show={loading} key="loading" />,
      <ContainStyled key="main">
        <LongList
          list={listFormat}
          Item={this.renderItem}
          onFetch={this.onFetch}
          isLong
          showFooter
        />
      </ContainStyled>,
    ]);
  }
}

export default RankItemListComponent;
