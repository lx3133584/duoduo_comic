import { connect } from 'react-redux';
import Component from './component';
import { configActions } from '@';

const mapStateToProps = state => ({
  brightness: state.config.get('brightness'),
  width: state.config.get('width'),
});

const mapDispatchToProps = dispatch => ({
  switchBrightness(params) {
    return dispatch(configActions.switchBrightness(params));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
