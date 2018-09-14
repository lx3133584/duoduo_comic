import { connect } from 'react-redux';
import Component from './component';
import { configActions } from '@';

const mapStateToProps = state => ({
  orientation: state.config.get('orientation'),
});

const mapDispatchToProps = dispatch => ({
  switchOrientation(params) {
    return dispatch(configActions.switchOrientation(params));
  },
  changeWidth(params) {
    return dispatch(configActions.changeWidth(params));
  },
  switchReadingMode(params) {
    return dispatch(configActions.switchReadingMode(params));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
