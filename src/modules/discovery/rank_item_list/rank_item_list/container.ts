import { connect } from 'react-redux';
import { getRankItemList } from '../actions';
import Component from './component';

const mapStateToProps = state => ({
  list: state.discovery.get('rank_item_list'),
});

const mapDispatchToProps = dispatch => ({
  getList(params) {
    return dispatch(getRankItemList(params));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
