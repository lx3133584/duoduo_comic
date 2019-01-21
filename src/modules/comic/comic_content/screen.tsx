import React, { PureComponent } from 'react';
import { RootState } from 'store';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import windowSizeSelector from 'selectors/window_size';
import { LoadingPage } from '@/comic/comic_detail';
import { connect } from 'react-redux';
import Orientation from 'react-native-orientation';
import DeviceBrightness from 'react-native-device-brightness';
import {
  ContentList,
  ContentStatusBar,
  ContentDrawerManager,
} from '.';
import { wrapWithLoading, wrapWithLoadingType, ILoadingProps } from 'utils';

const ContainStyled = styled.View`
  background-color: #282828;
`;

const mapStateToProps = (state: RootState) => ({
  orientation: state.config.get('orientation'),
  brightness: state.config.get('brightness'),
  width: windowSizeSelector(state).width,
});
type IProps = ReturnType<typeof mapStateToProps> & ILoadingProps;
@wrapWithLoading
@connect(mapStateToProps)
class ContentListScreen extends PureComponent<IProps, { show_drawer: boolean }> {
  static propTypes = {
    orientation: PropTypes.string.isRequired,
    brightness: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    ...wrapWithLoadingType,
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
  }

  initOrientation = () => {
    const { orientation } = this.props;
    if (orientation === 'vertical') return;
    Orientation.lockToLandscape();
  }

  initBrightness = () => {
    const { brightness } = this.props;
    DeviceBrightness.setBrightnessLevel(brightness);
  }

  toggleDrawer = () => {
    this.setState(({ show_drawer }) => ({ show_drawer: !show_drawer }));
  }

  render() {
    const { loading, width } = this.props;
    const { show_drawer } = this.state;
    return ([
      <LoadingPage show={loading} key="loading" width={width} />,
      <ContentDrawerManager key="drawer" show={show_drawer} {...this.props} />,
      <ContentStatusBar key="status_bar" {...this.props} />,
      <ContainStyled key="content">
        <ContentList toggleDrawer={this.toggleDrawer} {...this.props} />
      </ContainStyled>,
    ]);
  }
}

export default ContentListScreen;
