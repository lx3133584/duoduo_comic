import { connect } from 'react-redux';
import Component from './component';

const mapStateToProps = state => ({
  info: state.user.get('info'),
});

export default connect(
  mapStateToProps,
  null,
)(Component);
