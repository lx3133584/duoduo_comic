import { connect } from 'react-redux';
import Component from './component';

const mapStateToProps = state => ({
  title: state.comic.getIn(['detail', 'title']),
});

export default connect(
  mapStateToProps,
  null,
)(Component);
