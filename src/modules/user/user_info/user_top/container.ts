import { connect } from 'react-redux';
import Component from './component';
import { getUserInfo } from '../actions';

const mapStateToProps = state => ({
  info: state.user.get('info'),
});

const mapDispatchToProps = dispatch => ({
  getUser() {
    return dispatch(getUserInfo());
  },
});

export type IContainer = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
