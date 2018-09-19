import { connect } from 'react-redux';
import Component from './component';
import { addFavorite, removeFavorite, getComicList } from '../actions';

const mapStateToProps = state => ({
  detail: state.comic.get('detail'),
  list: state.comic.get('list'),
});

const mapDispatchToProps = dispatch => ({
  add(params) {
    return dispatch(addFavorite(params));
  },
  remove(params) {
    return dispatch(removeFavorite(params));
  },
  getList(params) {
    return dispatch(getComicList(params));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
