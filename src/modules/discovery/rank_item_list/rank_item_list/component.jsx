import React, { PureComponent } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import { RankItemListItem } from '@/discovery/rank_item_list';
import styled from 'styled-components';
import { LongList, LoadingPage } from '@';
import { wrapWithLoading, wrapWithLoadingType } from 'utils';

const ContainStyled = styled.view`
  padding-bottom: 72px;
`;
@wrapWithLoading
class RankItemListComponent extends PureComponent {
  static propTypes = {
    getList: PropTypes.func.isRequired,
    id: PropTypes.number,
    list: ImmutablePropTypes.list.isRequired,
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

  renderItem = (props) => {
    const { id } = this.props;
    return <RankItemListItem {...props} outid={id} />;
  };

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
