import React, { Component } from 'react';
import styled from 'styled-components/native';
import { is } from 'immutable';
import { TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

import Rating from '../rating';
import { IContainer } from './container';

const ContainStyled = styled.View`
  margin-bottom: 5px;
  padding: 28px 10px 10px;
  background-color: #fff;
`;
const TopContainStyled = styled.View`
  flex-direction: row;
  justify-content: space-between;
  border-bottom-width: 0.5px;
  border-bottom-color: #999;
`;
const LeftContainStyled = styled.View`
  flex-direction: column;
`;
const AuthorContainStyled = styled.Text`
  font-size: 12px;
  color: #999;
  margin: 18px 0;
`;
const AuthorStyled = styled.Text`
  color: #333;
  font-size: 14px;
`;
const StatusStyled = styled.Text`
  font-size: 12px;
  color: #999;
  margin-bottom: 10px;
`;
const DescStyled = styled.Text`
  font-size: 12px;
  color: #333;
  margin: 8px 0;
  line-height: 20px;
`;
class ComicDetailComponent extends Component<IContainer> {

  shouldComponentUpdate(nextProps) {
    const { detail } = this.props;
    return !is(nextProps.detail, detail);
  }

  render() {
    const { detail } = this.props;
    const status = detail.get('status');
    const author = detail.get('author') || '佚名';
    const update_time: any = detail.get('update_time');
    const update_date = update_time && update_time.slice(0, 10);
    const desc = detail.get('desc');
    return (
      <ContainStyled>
        <TopContainStyled>
          <LeftContainStyled>
            <TouchableOpacity onPress={() => Actions.search({ oKeyword: author })} activeOpacity={0.8}>
              <AuthorContainStyled>

                作者：
              <AuthorStyled>
                  {author} {'>'}
                </AuthorStyled>
              </AuthorContainStyled>
            </TouchableOpacity>
            <StatusStyled>
              {status}
              {' '}
  |
              {' '}
              {update_date}
            </StatusStyled>
          </LeftContainStyled>
          <Rating />
        </TopContainStyled>
        <DescStyled>
          {desc}
        </DescStyled>
      </ContainStyled>
    );
  }
}

export default ComicDetailComponent;
