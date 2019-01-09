import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Orientation from 'react-native-orientation';
import { ContentDrawerSettingCheckbox } from '..';
import { ContainerType } from './container';

const ContainStyled = styled.view`
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
interface IProps extends ContainerType {
  toggleDrawer(): void;
}
class ContentDrawerOrientationComponent extends PureComponent<IProps> {
  static propTypes = {
    switchOrientation: PropTypes.func.isRequired,
    switchReadingMode: PropTypes.func.isRequired,
    toggleDrawer: PropTypes.func.isRequired,
    orientation: PropTypes.string.isRequired,
  };

  switchOrientation = (value: 'vertical' | 'horizon') => {
    const {
      switchOrientation, toggleDrawer, switchReadingMode,
    } = this.props;
    toggleDrawer();
    if (value === 'vertical') Orientation.lockToPortrait();
    if (value === 'horizon') {
      Orientation.lockToLandscape();
      switchReadingMode('scroll');
    }
    switchOrientation(value);
  }

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
