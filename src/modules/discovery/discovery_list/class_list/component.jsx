import React, { PureComponent } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ClassListItem } from '..';
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

  onFetch() {
    const { getList } = this.props;
    return getList();
  }

  render() {
    const { list } = this.props;
    const listFormat = list.toArray();
    return (
      <ContainStyled>
        <LongList
          list={listFormat}
          Item={ClassListItem}
          numColumns={3}
          columnWrapperStyle={columnWrapperStyle}
        />
      </ContainStyled>
    );
  }
}

export default ClassListComponent;
