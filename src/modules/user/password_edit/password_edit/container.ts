import { connect } from 'react-redux';
import { editPassword } from '../actions';
import Component from './component';

const mapDispatchToProps = dispatch => ({
  changePassword(params) {
    return dispatch(editPassword(params));
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(Component);
