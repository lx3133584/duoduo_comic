import React from 'react';
import styled from 'styled-components/native';
import { ListItem } from 'react-native-elements';

const ItemDividingLine = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: #ddd;
  height: 0;
`;

const ListItemComponent: React.SFC<ListItem> = (props) => {
  return (
    <React.Fragment>
      <ListItem chevronColor="#999" {...props} key="item" />
      <ItemDividingLine key="line" />
    </React.Fragment>
  );
};

export default ListItemComponent;
