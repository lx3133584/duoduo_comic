import { connect } from 'react-redux';
import windowSizeSelector from 'selectors/window_size';
import Component from './component';

interface IOwnProps {
  url: string;
  path: string;
  index: number;
  size: {
    width: number;
    height: number;
  };
}
const mapStateToProps = state => ({
  width: windowSizeSelector(state).width,
});
export type IContainer = ReturnType<typeof mapStateToProps> & IOwnProps;
export default connect(
  mapStateToProps,
  null,
)(Component);
