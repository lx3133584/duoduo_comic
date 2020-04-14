import React, { PureComponent } from 'react';
import styled from 'styled-components/native';

import Orientation from 'react-native-orientation';
import ContentDrawerSettingCheckbox from '../content_drawer_setting_checkbox';
import { IContainer } from './container';

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
interface IProps extends IContainer {
  toggleDrawer(): void;
}
class ContentDrawerOrientationComponent extends PureComponent<IProps> {

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
