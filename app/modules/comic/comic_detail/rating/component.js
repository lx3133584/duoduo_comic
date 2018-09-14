import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Rating from 'react-native-star-rating';
import { RatingModal } from '..';
import { TouchableNativeFeedback } from '@';
import { numberFormat } from 'utils';
import { yellow } from 'theme';

const ContainStyled = styled.View`
  height: 75px;
  width: 60px;
  background-color: #fff;
  margin-right: 8px;
  align-items: center;
  elevation: 2;
  padding: 5px;
`;
const TitleStyled = styled.Text`
  color: #666;
  font-size: 12px;
`;
const ScoreStyled = styled.Text`
  color: #000;
  font-size: 18px;
`;
const ScoreNumberStyled = styled.Text`
  color: #666;
  font-size: 10px;
  margin: 1px 0;
`;

class RatingComponent extends PureComponent {
  static propTypes = {
    score: PropTypes.number,
    score_number: PropTypes.number,
  };

  static defaultProps = {
    score: 0,
    score_number: 0,
  }

  constructor() {
    super();
    this.cancel = this.cancel.bind(this);
  }

  state = {
    isVisible: false,
  };

  cancel() {
    this.setState({ isVisible: false });
  }

  render() {
    const { score, score_number } = this.props;
    const { isVisible } = this.state;
    return (
      <TouchableNativeFeedback onPress={() => this.setState({ isVisible: true })}>
        <ContainStyled>
          <TitleStyled>
评分
          </TitleStyled>
          <ScoreStyled>
            {Math.round(+score * 10) / 10}
          </ScoreStyled>
          <ScoreNumberStyled>
(
            {numberFormat(score_number)}
)
          </ScoreNumberStyled>
          {!!score && (
          <Rating
            starSize={8}
            rating={score / 2}
            disabled
            fullStarColor={yellow}
            halfStarEnabled
            emptyStarColor="#dedede"
          />
          )}
          <RatingModal isVisible={isVisible} cancel={this.cancel} />
        </ContainStyled>
      </TouchableNativeFeedback>
    );
  }
}

export default RatingComponent;
