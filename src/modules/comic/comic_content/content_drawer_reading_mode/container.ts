import { connect } from 'react-redux';
import Component from './component';
import { configActions } from '@';
import { goToIndex } from '../actions';

const mapStateToProps = state => ({
  mode: state.config.get('mode'),
  index: state.comic.getIn(['detail', 'index']),
});

const mapDispatchToProps = dispatch => ({
  switchReadingMode(params) {
    return dispatch(configActions.switchReadingMode(params));
  },
  goIndex(params) {
    return dispatch(goToIndex(params));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
