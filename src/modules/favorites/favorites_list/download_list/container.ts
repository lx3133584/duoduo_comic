import { connect } from 'react-redux';
import { removeDownloadComic } from '../actions';
import Component from './component';

const mapStateToProps = state => ({
  list: state.favorites.get('download_list'),
});

const mapDispatchToProps = dispatch => ({
  remove(params) {
    return dispatch(removeDownloadComic(params));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
