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
import { ContainerType } from './container';

const headerHeight = Header.height;
const containStyle = {
  position: 'absolute',
  left: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.85)',
  zIndex: 2,
};
type IContainStyle = {
  position?: 'absolute' | 'relative';
} & typeof containStyle;

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
interface IProps extends ContainerType {
  show: boolean;
  title: string;
}
class ContentDrawerManagerComponent extends PureComponent<IProps> {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    width: PropTypes.number.isRequired,
  };

  topComponent?;
  bottomComponent?;

  state = {
    bottomType: 'main',
  };

  componentWillReceiveProps(nextProps) {
    const { show } = this.props;
    if (nextProps.show !== show) this.toggleDrawer();
  }

  _getRef = (type: 'topComponent' | 'bottomComponent') => (ref) => this[type] = ref;

  toggleDrawer = () => {
    const { bottomType } = this.state;
    const { show, width } = this.props;
    if (!show) this.switchBottomType('main');
    const { height } = bottom_map[show ? bottomType : 'main'];
    const ease = show ? 'ease-out' : 'ease-in';
    const duration = 200;
    this.topComponent.transitionTo({ top: show ? -headerHeight : 0, width }, duration, ease);
    this.bottomComponent.transitionTo({ bottom: show ? -height : 0, height, width }, duration, ease);
  }

  switchBottomType = (type: keyof typeof bottom_map) => {
    const { height } = bottom_map[type];
    const duration = 200;
    this.topComponent.transitionTo({ top: -headerHeight }, duration, 'ease-out');
    this.setState({ bottomType: type });
    this.bottomComponent.transitionTo({ height }, duration, 'ease');
  }

  render() {
    const { bottomType } = this.state;
    const { width } = this.props;
    const { Component, height } = bottom_map[bottomType];
    return ([
      <Animatable.View
        ref={this._getRef('topComponent')}
        style={[containStyle as IContainStyle, { top: -headerHeight, height: headerHeight, width }]}
        key="top"
      >
        <ContentHeader {...this.props} />
      </Animatable.View>,
      <Animatable.View
        ref={this._getRef('bottomComponent')}
        style={[containStyle as IContainStyle, { bottom: -height, height, width }]}
        key="bottom"
      >
        <Component switchBottomType={this.switchBottomType} toggleDrawer={this.toggleDrawer} />
      </Animatable.View>,
    ]);
  }
}

export default ContentDrawerManagerComponent;
