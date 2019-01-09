import { RootState } from 'store';
import { connect } from 'react-redux';
import Component from './component';

const mapStateToProps = (state: RootState) => ({
  orientation: state.config.get('orientation'),
});

export type ContainerType = ReturnType<typeof mapStateToProps>;

export default connect(
  mapStateToProps,
  null,
)(Component);
