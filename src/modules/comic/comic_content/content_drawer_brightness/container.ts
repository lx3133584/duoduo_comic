import { RootState } from 'store';
import { connect } from 'react-redux';
import { configActions } from '@';
import windowSizeSelector from 'selectors/window_size';
import Component from './component';

const mapStateToProps = (state: RootState) => ({
  brightness: state.config.get('brightness'),
  width: windowSizeSelector(state).width,
});

const mapDispatchToProps = (dispatch) => ({
  switchBrightness(params: any) {
    return dispatch(configActions.switchBrightness(params));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);