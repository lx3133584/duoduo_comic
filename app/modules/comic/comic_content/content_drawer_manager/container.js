import { connect } from 'react-redux';
import Component from './component';

const mapStateToProps = state => ({
  width: state.config.get('width'),
});

export default connect(
  mapStateToProps,
  null,
)(Component);
