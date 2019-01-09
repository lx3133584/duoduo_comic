import React from 'react';
import styled from 'styled-components';
import { ListItem } from 'react-native-elements';

const ItemDividingLine = styled.view`
  border-bottom-width: 1px;
  border-bottom-color: #ddd;
  height: 0;
`;

export default function ListItemComponent(props) {
  return ([
    <ListItem chevronColor="#999" {...props} key="item" />,
    <ItemDividingLine key="line" />,
  ]);
}
