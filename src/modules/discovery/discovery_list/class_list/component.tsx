import React, { PureComponent } from 'react';

import styled from 'styled-components/native';
import ClassListItem from '../class_list_item';
import { LongList } from '@';
import { IContainer } from './container';

const ContainStyled = styled.View`
  padding-bottom: 125px;
`;

const columnWrapperStyle = {
  flexDirection: 'row' as 'row',
  justifyContent: 'space-around' as 'space-around',
};

class ClassListComponent extends PureComponent<IContainer> {

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
