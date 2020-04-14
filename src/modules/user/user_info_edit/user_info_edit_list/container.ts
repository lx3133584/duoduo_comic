import { connect } from 'react-redux';
import { uploadAvatar, changeUserInfo } from '../actions';
import Component from './component';

const mapStateToProps = state => ({
  info: state.user.get('info'),
  csrf: state.cookies.get('csrfToken'),
});

const mapDispatchToProps = dispatch => ({
  uploadUserAvatar(params) {
    return dispatch(uploadAvatar(params));
  },
  editUserInfo(params) {
    return dispatch(changeUserInfo(params));
  },
});

export type IContainer = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
