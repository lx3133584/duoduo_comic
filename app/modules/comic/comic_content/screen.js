import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { StatusBar, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { LoadingPage } from '@/comic/comic_detail';
import { connect } from 'react-redux';
import Orientation from 'react-native-orientation';
import DeviceBrightness from 'react-native-device-brightness';
import {
  ContentList,
  ContentStatusBar,
  ContentDrawerManager,
} from '@/comic/comic_content';
import { wrapWithLoading } from 'utils';
import { configActions } from '@';

const ContainStyled = styled.View`
  background-color: #282828;
`;
@wrapWithLoading
class ContentListScreen extends PureComponent {
  static propTypes = {
    hideLoading: PropTypes.func.isRequired,
    changeWidth: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    orientation: PropTypes.string.isRequired,
    brightness: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
  };

  state = {
    show_drawer: false,
  };

  componentDidMount() {
    this.initConfig();
  }

  componentWillUnmount() {
    Orientation.lockToPortrait();
  }

  initConfig = () => {
    this.initOrientation();
    this.initBrightness();
  };

  initOrientation = () => {
    const { orientation, changeWidth } = this.props;
    if (orientation === 'vertical') return;
    Orientation.lockToLandscape();
    changeWidth(Dimensions.get('window').height);
  };

  initBrightness = () => {
    const { brightness } = this.props;
    DeviceBrightness.setBrightnessLevel(brightness);
  };

  toggleDrawer = () => {
    this.setState(({ show_drawer }) => ({ show_drawer: !show_drawer }));
  };

  render() {
    const { loading, width } = this.props;
    const { show_drawer } = this.state;
    return ([
      <LoadingPage show={loading} key="loading" width={width} />,
      <ContentDrawerManager key="drawer" show={show_drawer} {...this.props} />,
      <ContentStatusBar key="status_bar" {...this.props} />,
      <ContainStyled key="content">
        <StatusBar hidden />
        <ContentList toggleDrawer={this.toggleDrawer} {...this.props} />
      </ContainStyled>,
    ]);
  }
}

const mapStateToProps = state => ({
  orientation: state.config.get('orientation'),
  brightness: state.config.get('brightness'),
  width: state.config.get('width'),
});

const mapDispatchToProps = dispatch => ({
  changeWidth(params) {
    return dispatch(configActions.changeWidth(params));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ContentListScreen);
