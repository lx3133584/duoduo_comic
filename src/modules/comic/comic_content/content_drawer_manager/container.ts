import { RootState } from 'store';
import { connect } from 'react-redux';
import windowSizeSelector from 'selectors/window_size';
import Component from './component';

const mapStateToProps = (state: RootState) => ({
  width: windowSizeSelector(state).width,
});

export default connect(
  mapStateToProps,
  null,
)(Component);
