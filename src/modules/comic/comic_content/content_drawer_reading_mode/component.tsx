import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ContentDrawerSettingCheckbox } from '..';

const ContainStyled = styled.view`
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

class ContentDrawerReadingModeComponent extends PureComponent {
  static propTypes = {
    goIndex: PropTypes.func.isRequired,
    switchReadingMode: PropTypes.func.isRequired,
    mode: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
  };

  switchReadingMode = (value) => {
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
