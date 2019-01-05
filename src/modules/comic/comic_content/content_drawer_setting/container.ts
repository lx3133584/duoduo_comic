import { RootState } from 'store';
import { connect } from 'react-redux';
import Component from './component';

const mapStateToProps = (state: RootState) => ({
  orientation: state.config.get('orientation'),
});

export default connect(
  mapStateToProps,
  null,
)(Component);
