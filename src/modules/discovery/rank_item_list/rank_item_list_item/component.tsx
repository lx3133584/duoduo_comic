import React from 'react';
import styled from 'styled-components/native';

import { Badge } from 'react-native-elements';
import { LongListItem } from '@';
import { rankTypes } from '@/discovery';
import { numberFormat } from 'utils';

const ContainStyled = styled.View`
  flex-direction: row;
  padding: 8px;
`;
const DescStyled = styled.Text`
  color: #999;
  font-size: 14px;
  margin: 10px 0;
`;
const AuthorStyled = styled.Text`
  color: #666;
  font-size: 12px;
  margin-right: 10px;
`;
const textStyle = {
  fontSize: 10,
};
const wrapperStyle = {
  marginRight: 10,
};
function RankItemListItem(props) {
  const { desc, author, outid } = props;
  const { key, color } = rankTypes[outid];
  const { [key]: value } = props;
  return (
    <LongListItem {...props}>
      <DescStyled numberOfLines={3}>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {desc.replace(':', '')}
      </DescStyled>
      <ContainStyled>
        <AuthorStyled>
          {author || '佚名'}
        </AuthorStyled>
        <Badge
          value={numberFormat(value)}
          textStyle={textStyle}
          wrapperStyle={wrapperStyle}
          containerStyle={{ backgroundColor: color }}
        />
      </ContainStyled>
    </LongListItem>
  );
}

RankItemListItem.defaultProps = {
  desc: '',
  author: '佚名',
};
export default RankItemListItem;
