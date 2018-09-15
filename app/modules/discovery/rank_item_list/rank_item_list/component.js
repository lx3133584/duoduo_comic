import React, { PureComponent } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import { RankItemListItem } from '@/discovery/rank_item_list';
import styled from 'styled-components';
import { LongList, LoadingPage } from '@';
import { wrapWithLoading } from 'utils';

const ContainStyled = styled.View`
  padding-top: 15px;
  padding-bottom: 72px;
`;
@wrapWithLoading
class RankItemListComponent extends PureComponent {
  static propTypes = {
    getList: PropTypes.func.isRequired,
    hideLoading: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    type: PropTypes.number,
    list: ImmutablePropTypes.list.isRequired,
  };

  static defaultProps = {
    type: 0,
  }

  constructor(props) {
    super(props);
    this.onFetch = this.onFetch.bind(this);
  }

  componentDidMount() {
    this.onFetch(0);
  }

  async onFetch(page) {
    const { getList, hideLoading, type } = this.props;
    const res = await getList({ page, type });
    hideLoading();
    return res;
  }

  renderItem = props => <RankItemListItem {...props} />;

  render() {
    const { list, loading } = this.props;
    const listFormat = list.toJS();
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
