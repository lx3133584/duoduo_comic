import { connect } from 'react-redux';
import windowSizeSelector from 'selectors/window_size';
import findNextChapterSelector from 'selectors/find_next_chapter';
import Component from './component';
import { goToIndex } from '../actions';

const prevItemSelector = findNextChapterSelector(-1);
const nextItemSelector = findNextChapterSelector(1);

const mapStateToProps = state => ({
  index: state.comic.getIn(['detail', 'index']),
  total: state.comic.get('content_total'),
  prev: prevItemSelector(state),
  next: nextItemSelector(state),
  width: windowSizeSelector(state).width,
});

const mapDispatchToProps = dispatch => ({
  goIndex(params) {
    return dispatch(goToIndex(params));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
