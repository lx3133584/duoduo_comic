import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Dimensions } from 'react-native';
import Orientation from 'react-native-orientation';
import { ContentDrawerSettingCheckbox } from '..';

const ContainStyled = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;
const options = [
  {
    text: '竖 屏',
    value: 'vertical',
  },
  {
    text: '横 屏',
    value: 'horizon',
  },
];

class ContentDrawerOrientationComponent extends PureComponent {
  static propTypes = {
    switchOrientation: PropTypes.func.isRequired,
    switchReadingMode: PropTypes.func.isRequired,
    toggleDrawer: PropTypes.func.isRequired,
    changeWidth: PropTypes.func.isRequired,
    orientation: PropTypes.string.isRequired,
  };

  switchOrientation = (value) => {
    const {
      switchOrientation, changeWidth, toggleDrawer, switchReadingMode,
    } = this.props;
    toggleDrawer();
    if (value === 'vertical') Orientation.lockToPortrait();
    if (value === 'horizon') {
      Orientation.lockToLandscape();
      switchReadingMode('scroll');
    }
    changeWidth(Dimensions.get('window').height);
    switchOrientation(value);
  };

  render() {
    const { orientation } = this.props;
    return (
      <ContainStyled>
        <ContentDrawerSettingCheckbox
          title="屏幕方向："
          changeValue={this.switchOrientation}
          value={orientation}
          options={options}
        />
      </ContainStyled>
    );
  }
}

export default ContentDrawerOrientationComponent;
