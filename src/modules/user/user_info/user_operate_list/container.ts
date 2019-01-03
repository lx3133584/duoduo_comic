import { connect } from 'react-redux';
import Component from './component';

const mapStateToProps = state => ({
  isLogin: !!state.user.get('info').size,
});

export default connect(
  mapStateToProps,
)(Component);
