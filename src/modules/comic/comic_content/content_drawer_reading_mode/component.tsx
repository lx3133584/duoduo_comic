import React, { PureComponent } from 'react';
import styled from 'styled-components/native';

import ContentDrawerSettingCheckbox from '../content_drawer_setting_checkbox';
import { IContainer } from './container';

const ContainStyled = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;
const options = [
  {
    text: '滚动模式',
    value: 'scroll',
  },
  {
    text: '翻页模式',
    value: 'page_turning',
  },
];

class ContentDrawerReadingModeComponent extends PureComponent<IContainer> {

  switchReadingMode = (value: 'scroll' | 'page_turning') => {
    const { switchReadingMode, goIndex, index } = this.props;
    if (value === 'scroll') goIndex(index);
    switchReadingMode(value);
  }

  render() {
    const { mode } = this.props;
    return (
      <ContainStyled>
        <ContentDrawerSettingCheckbox
          title="阅读模式："
          changeValue={this.switchReadingMode}
          value={mode}
          options={options}
        />
      </ContainStyled>
    );
  }
}

export default ContentDrawerReadingModeComponent;
