import React, { PureComponent } from 'react';

import styled from 'styled-components/native';
import { Button } from 'react-native-elements';
import Rating from 'react-native-star-rating';
import { Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import { yellow } from 'theme';
import { IContainer } from './container';

const { width } = Dimensions.get('window');

const ContainStyled = styled.View`
  height: 200px;
  width: ${width};
  background-color: #fff;
  justify-content: center;
  align-items: center;
`;
const TextStyled = styled.Text`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
`;
const NumberStyled = styled.Text`
  font-size: 32px;
  color: ${yellow};
`;
const containStyle = {
  flexDirection: 'column-reverse' as 'column-reverse',
  justifyContent: 'flex-start' as 'flex-start',
  margin: 0,
};
const buttonStyle = {
  marginTop: 20,
  backgroundColor: yellow,
  width: 150,
  height: 40,
  borderRadius: 100,
};
const textStyle = {
  fontSize: 14,
  color: '#fff',
  textAlign: 'justify' as 'justify',
};

class RatingModalComponent extends PureComponent<IContainer> {

  static defaultProps = {
    id: 0,
    my_score: 0,
  };

  state = {
    score: 5,
  };

  constructor(props) {
    super(props);
    this.onFinishRating = this.onFinishRating.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onFinishRating(value) {
    this.setState({ score: value * 2 });
  }

  onSubmit() {
    const { add, id } = this.props;
    const { score } = this.state;
    add({ score, id });
  }

  render() {
    const { isVisible, cancel, my_score } = this.props;
    const { score } = this.state;
    return (
      <Modal
        isVisible={isVisible}
        useNativeDriver
        hideModalContentWhileAnimating
        onBackdropPress={cancel}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        style={containStyle}
      >
        <ContainStyled>
          {my_score
            ? (
              <TextStyled>
已评价：
                <NumberStyled>
                  {my_score}
                </NumberStyled>
              </TextStyled>
            )
            : (
              <TextStyled>
未评价：
                <NumberStyled>
                  {score}
                </NumberStyled>
/10
              </TextStyled>
            )
          }
          <Rating
            starSize={48}
            rating={my_score / 2 || score / 2}
            disabled={!!my_score}
            fullStarColor={yellow}
            halfStarEnabled
            emptyStarColor="#dedede"
            selectedStar={this.onFinishRating}
          />
          {!my_score && (
          <Button
            title="确定"
            onPress={this.onSubmit}
            titleStyle={textStyle}
            buttonStyle={buttonStyle}
          />
          )}
        </ContainStyled>
      </Modal>
    );
  }
}

export default RatingModalComponent;
