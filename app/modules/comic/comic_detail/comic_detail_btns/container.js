import { connect } from 'react-redux';
import Component from './component';
import { addFavorite, removeFavorite } from '../actions';

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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
