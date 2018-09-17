import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { LongListItem } from '@/search/search_list';
import { Badge } from 'react-native-elements';
import { green, red, purple } from 'theme';

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
  width: 50,
  marginRight: 10,
};
const greenBackground = {
  backgroundColor: green,
};
const redBackground = {
  backgroundColor: red,
};
const purpleBackground = {
  backgroundColor: purple,
};
function SearchListItem(props) {
  const {
    desc, author, status, class_name,
  } = props;
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
          value={status}
          textStyle={textStyle}
          wrapperStyle={wrapperStyle}
          containerStyle={status === '完结' ? greenBackground : redBackground}
        />
        {!!class_name && (
        <Badge
          value={class_name}
          textStyle={textStyle}
          wrapperStyle={wrapperStyle}
          containerStyle={purpleBackground}
        />
        )}
      </ContainStyled>
    </LongListItem>
  );
}
SearchListItem.propTypes = {
  desc: PropTypes.string,
  class_name: PropTypes.string,
  author: PropTypes.string,
  status: PropTypes.string.isRequired,
};
SearchListItem.defaultProps = {
  desc: '',
  class_name: '',
  author: '',
};
export default SearchListItem;
