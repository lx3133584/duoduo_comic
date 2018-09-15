import React, { PureComponent } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ClassListItem } from '@/discovery/discovery_list';
import { LongList } from '@';

const ContainStyled = styled.View`
  padding-bottom: 125px;
`;

const columnWrapperStyle = {
  flexDirection: 'row',
  justifyContent: 'space-around',
};

class ClassListComponent extends PureComponent {
  static propTypes = {
    getList: PropTypes.func.isRequired,
    list: ImmutablePropTypes.list.isRequired,
  };

  componentDidMount() {
    this.onFetch();
  }

  async onFetch() {
    const { getList } = this.props;
    await getList();
  }

  render() {
    const { list } = this.props;
    const listFormat = list.toJS();
    return (
      <ContainStyled>
        <LongList
          list={listFormat}
          Item={ClassListItem}
          customkey="id"
          numColumns={3}
          columnWrapperStyle={columnWrapperStyle}
        />
      </ContainStyled>
    );
  }
}

export default ClassListComponent;
