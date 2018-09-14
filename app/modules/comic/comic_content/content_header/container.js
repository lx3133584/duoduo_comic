import { connect } from 'react-redux';
import Component from './component';

const mapStateToProps = state => ({
  title: state.comic.get('chapter_title'),
});

export default connect(
  mapStateToProps,
  null,
)(Component);
