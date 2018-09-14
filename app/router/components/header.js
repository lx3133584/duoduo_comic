import React, { PureComponent } from 'react';
import { Header } from 'react-native-elements';
import PropTypes from 'prop-types';
import { brand_primary } from 'theme';
import LeftButton from './left_button';

const centerTextStyle = {
  color: '#fff',
  fontSize: 16,
};
const outerContainerStyles = {
  padding: 0,
  paddingBottom: 10,
  height: 50,
  borderBottomWidth: 0,
};

class HeaderComponent extends PureComponent {
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
  }

  render() {
    const {
      title, isNoBack, customTitle, customBackgroundColor, rightComponent,
    } = this.props;
    return (
      <Header
        leftComponent={isNoBack ? null : <LeftButton />}
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
