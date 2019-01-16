import { RootState } from 'store';
import { connect } from 'react-redux';
import Component from './component';

const mapStateToProps = (state: RootState) => ({
  index: state.comic.getIn(['detail', 'index']) + 1,
  total: state.comic.get('content_total'),
});

export default connect(
  mapStateToProps,
)(Component);
