import { RootState } from 'store';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import getContentCache from 'selectors/get_cache';
import Component from './component';
import {
  getContentList,
  preContentList,
  saveContentIndex,
  useTheContentCache,
} from '../actions';
interface IOwnProps {
  chapter_id: number;
  pre?: boolean;
  title: string;
}
const chapterIdSelector = (state: RootState, ownProps: IOwnProps) => ownProps.chapter_id;
const cacheSelector = getContentCache(chapterIdSelector);
const mapStateToProps = (state: RootState, ownProps: IOwnProps) => ({
  detail_chapter_id: state.comic.getIn(['detail', 'chapter_id']),
  content_index: state.comic.getIn(['detail', 'index']),
  pre_content: state.comic.get('pre_content'),
  go_to_flag: state.comic.get('go_to_flag'),
  mode: state.config.get('mode'),
  content_cache: cacheSelector(state, ownProps),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getContent(params: any) {
    return dispatch(getContentList(params));
  },
  preContent(params: any) {
    return dispatch(preContentList(params));
  },
  saveIndex(params: any) {
    return dispatch(saveContentIndex(params));
  },
  useCache(params: any) {
    return dispatch(useTheContentCache(params));
  },
});
export type ContainerType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & IOwnProps;
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
