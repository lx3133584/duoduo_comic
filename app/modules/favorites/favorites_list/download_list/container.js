import { connect } from 'react-redux';
import { comicDetailActions } from '@/comic';
import Component from './component';

const mapStateToProps = state => ({
  list: state.favorites.get('download_list'),
});

const mapDispatchToProps = dispatch => ({
  remove(params) {
    return dispatch(comicDetailActions.removeFavorite(params));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
