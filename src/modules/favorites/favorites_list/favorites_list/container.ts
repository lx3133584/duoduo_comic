import { connect } from 'react-redux';
import { getFavoritesList } from '../actions';
import { comicDetailActions } from '@/comic';
import Component from './component';

const mapStateToProps = state => ({
  list: state.favorites.get('favorites_list'),
});

const mapDispatchToProps = dispatch => ({
  getList(params?: any) {
    return dispatch(getFavoritesList(params));
  },
  remove(params) {
    return dispatch(comicDetailActions.removeFavorite(params));
  },
});

export type IContainer = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
