import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import * as Animatable from 'react-native-animatable';
import { Header } from 'router';
import {
  ContentHeader,
  ContentDrawerMenu,
  ContentDrawerProgress,
  ContentDrawerSetting,
} from '..';

const headerHeight = Header.height;
const containStyle = {
  position: 'absolute',
  left: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.85)',
  zIndex: 2,
};

const bottom_map = {
  main: {
    Component: ContentDrawerMenu,
    height: ContentDrawerMenu.height,
  },
  progress: {
    Component: ContentDrawerProgress,
    height: ContentDrawerProgress.height,
  },
  setting: {
    Component: ContentDrawerSetting,
    height: ContentDrawerSetting.height,
  },
};

class ContentDrawerManagerComponent extends PureComponent {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    width: PropTypes.number.isRequired,
  };

  state = {
    bottomType: 'main',
  };

  componentWillReceiveProps(nextProps) {
    const { show } = this.props;
    if (nextProps.show !== show) this.toggleDrawer();
  }

  _getRef = type => ref => this[type] = ref;

  toggleDrawer = () => {
    const { bottomType } = this.state;
    const { show, width } = this.props;
    show || this.switchBottomType('main');
    const { height } = bottom_map[show ? bottomType : 'main'];
    const ease = show ? 'ease-out' : 'ease-in';
    const duration = 200;
    this.topComponent.transitionTo({ top: show ? -headerHeight : 0, width }, duration, ease);
    this.bottomComponent.transitionTo({ bottom: show ? -height : 0, height, width }, duration, ease);
  };

  switchBottomType = (type) => {
    const { height } = bottom_map[type];
    const duration = 200;
    this.topComponent.transitionTo({ top: -headerHeight }, duration, 'ease-out');
    this.setState({ bottomType: type });
    this.bottomComponent.transitionTo({ height }, duration, 'ease');
  };

  render() {
    const { bottomType } = this.state;
    const { width } = this.props;
    const { Component, height } = bottom_map[bottomType];
    return ([
      <Animatable.View
        ref={this._getRef('topComponent')}
        style={[containStyle, { top: -headerHeight, height: headerHeight, width }]}
        key="top"
      >
        <ContentHeader {...this.props} />
      </Animatable.View>,
      <Animatable.View
        ref={this._getRef('bottomComponent')}
        style={[containStyle, { bottom: -height, height, width }]}
        key="bottom"
      >
        <Component switchBottomType={this.switchBottomType} toggleDrawer={this.toggleDrawer} />
      </Animatable.View>,
    ]);
  }
}

export default ContentDrawerManagerComponent;
