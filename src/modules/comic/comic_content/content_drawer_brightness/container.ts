import { RootState } from 'store';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { configActions } from '@';
import windowSizeSelector from 'selectors/window_size';
import Component from './component';

const mapStateToProps = (state: RootState) => ({
  brightness: state.config.get('brightness'),
  width: windowSizeSelector(state).width,
});
const mapDispatchToProps = (dispatch: Dispatch<ReturnType<typeof configActions.switchBrightness>>) => ({
  switchBrightness(params: any) {
    return dispatch(configActions.switchBrightness(params));
  },
});

export type IContainer = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
