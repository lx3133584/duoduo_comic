import { RootState } from 'store';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Component from './component';
import { configActions } from '@';
import { goToIndex } from '../actions';

const mapStateToProps = (state: RootState) => ({
  mode: state.config.get('mode'),
  index: state.comic.getIn(['detail', 'index']),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  switchReadingMode(params) {
    return dispatch(configActions.switchReadingMode(params));
  },
  goIndex(params) {
    return dispatch(goToIndex(params));
  },
});

export type IContainer = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
