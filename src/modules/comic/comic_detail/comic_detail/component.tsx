import React, { Component } from 'react';
import styled from 'styled-components';
import { is } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Rating } from '..';

const ContainStyled = styled.view`
  margin-bottom: 5px;
  padding: 28px 10px 10px;
  background-color: #fff;
`;
const TopContainStyled = styled.view`
  flex-direction: row;
  justify-content: space-between;
  border-bottom-width: 0.5px;
  border-bottom-color: #999;
`;
const LeftContainStyled = styled.view`
  flex-direction: column;
`;
const AuthorContainStyled = styled.text`
  font-size: 12px;
  color: #999;
  margin: 18px 0;
`;
const AuthorStyled = styled.text`
  color: #333;
  font-size: 14px;
`;
const StatusStyled = styled.text`
  font-size: 12px;
  color: #999;
  margin-bottom: 10px;
`;
const DescStyled = styled.text`
  font-size: 12px;
  color: #333;
  margin: 8px 0;
  line-height: 20px;
`;
class ComicDetailComponent extends Component {
  static propTypes = {
    detail: ImmutablePropTypes.map.isRequired,
  };

  shouldComponentUpdate(nextProps) {
    const { detail } = this.props;
    return !is(nextProps.detail, detail);
  }

  render() {
    const { detail } = this.props;
    const status = detail.get('status');
    const author = detail.get('author');
    const update_time = detail.get('update_time');
    const update_date = update_time && update_time.slice(0, 10);
    const desc = detail.get('desc');
    return (
      <ContainStyled>
        <TopContainStyled>
          <LeftContainStyled>
            <AuthorContainStyled>

              作者：
              <AuthorStyled>
                {author || '佚名'}
              </AuthorStyled>
            </AuthorContainStyled>
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
