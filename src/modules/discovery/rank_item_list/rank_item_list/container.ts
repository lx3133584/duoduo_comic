import { RootState } from 'store';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { getRankItemList } from '../actions';
import Component from './component';
interface IOwnProps {
  id: number;
}
const mapStateToProps = (state: RootState) => ({
  list: state.discovery.get('rank_item_list'),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getList(params) {
    return dispatch(getRankItemList(params));
  },
});
export type IContainer = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & IOwnProps;
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component as any);
