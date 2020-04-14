import { RootState } from 'store';
import { connect } from 'react-redux';
import windowSizeSelector from 'selectors/window_size';
import Component from './component';
interface IOwnProps {
  show?: boolean;
  title?: string;
}

const mapStateToProps = (state: RootState) => ({
  width: windowSizeSelector(state).width,
});

export type IContainer = ReturnType<typeof mapStateToProps> & IOwnProps;

export default connect(
  mapStateToProps,
  null,
)(Component);
