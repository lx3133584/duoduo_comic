import { connect } from 'react-redux';
import { getSearchList } from '../actions';
import Component from './component';

const mapStateToProps = state => ({
  keyword: state.search.get('keyword'),
});

const mapDispatchToProps = dispatch => ({
  search(params) {
    return dispatch(getSearchList(params));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
