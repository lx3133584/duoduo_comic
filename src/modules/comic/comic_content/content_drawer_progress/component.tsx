import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Slider } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import Feather from 'react-native-vector-icons/Feather';
import { brand_primary } from 'theme';
import { ContainerType } from './container';

const ICON_SIZE = 20;
const ICON_COLOR = '#fff';

const NextIcon = () => <Feather name="chevron-right" size={ICON_SIZE} color={ICON_COLOR} />;
const PrevIcon = () => <Feather name="chevron-left" size={ICON_SIZE} color={ICON_COLOR} />;

const ContainStyled = styled.view`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;
const sliderStyle = {
  height: 40,
};
const thumbTouchSize = {
  width: 25,
  height: 25,
};
class ContentDrawerProgressComponent extends PureComponent<ContainerType> {
  static height = 50;

  static propTypes = {
    goIndex: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    prev: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    }),
    next: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    }),
  };

  static defaultProps = {
    prev: undefined,
    next: undefined,
  };

  goIndex = (value: number) => {
    const { goIndex } = this.props;
    goIndex(value);
  }

  goPrev = () => {
    const { prev } = this.props;
    this.goChapter(prev);
  }

  goNext = () => {
    const { next } = this.props;
    this.goChapter(next);
  }

  goChapter = (data?: Comic.ChapterItem) => {
    if (!data) return;
    const { id, title } = data;
    Actions.replace('comicContent', { chapter_id: id, title, pre: false });
  }

  render() {
    const { index, total, width } = this.props;
    return (
      <ContainStyled style={{ height: ContentDrawerProgressComponent.height, width }}>
        <TouchableOpacity onPress={this.goPrev}>
          <PrevIcon />
        </TouchableOpacity>
        <Slider
          style={[sliderStyle, { width: width - 90 }]}
          value={index}
          minimumValue={0}
          maximumValue={total - 1}
          thumbTintColor={brand_primary}
          thumbTouchSize={thumbTouchSize}
          minimumTrackTintColor={brand_primary}
          maximumTrackTintColor="#ddd"
          step={1}
          onSlidingComplete={this.goIndex}
        />
        <TouchableOpacity onPress={this.goNext}>
          <NextIcon />
        </TouchableOpacity>
      </ContainStyled>
    );
  }
}

export default ContentDrawerProgressComponent;
