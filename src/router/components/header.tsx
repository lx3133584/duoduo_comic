import React, { PureComponent, ReactElement } from 'react';
import { Header } from 'react-native-elements';
import PropTypes from 'prop-types';
import { StatusBar } from 'react-native';
import { brand_primary } from 'theme';
import LeftButton from './left_button';

const statusBarHeight = StatusBar.currentHeight || 24;
const height = 50 + statusBarHeight;
const centerTextStyle = {
  color: '#fff',
  fontSize: 16,
};
const outerContainerStyles = {
  paddingTop: statusBarHeight,
  paddingBottom: 0,
  height,
  borderBottomWidth: 0,
};
interface IProps {
  title?: string;
  isNoBack?: boolean;
  customTitle?: string;
  customBackgroundColor?: string;
  rightComponent?: ReactElement<{}>;
}
class HeaderComponent extends PureComponent<IProps> {
  static statusBarHeight = statusBarHeight;
  static height = height;
  static propTypes = {
    isNoBack: PropTypes.bool,
    title: PropTypes.string,
    customTitle: PropTypes.string,
    customBackgroundColor: PropTypes.string,
    rightComponent: PropTypes.element,
  };

  static defaultProps = {
    isNoBack: false,
    title: '',
    customTitle: '',
    customBackgroundColor: '',
    rightComponent: null,
  };

  render() {
    const {
      title, isNoBack, customTitle, customBackgroundColor, rightComponent,
    } = this.props;
    return (
      <Header
        leftComponent={isNoBack ? undefined : <LeftButton />}
        centerComponent={{ text: customTitle || title, style: centerTextStyle }}
        outerContainerStyles={{
          backgroundColor: customBackgroundColor || brand_primary,
          ...outerContainerStyles,
        }}
        rightComponent={rightComponent}
      />
    );
  }
}

export default HeaderComponent;
