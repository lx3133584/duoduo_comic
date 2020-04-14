import { RootState } from 'store';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Component from './component';
import { configActions } from '@';

const mapStateToProps = (state: RootState) => ({
  orientation: state.config.get('orientation'),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  switchOrientation(params: any) {
    return dispatch(configActions.switchOrientation(params));
  },
  switchReadingMode(params: any) {
    return dispatch(configActions.switchReadingMode(params));
  },
});

export type IContainer = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
