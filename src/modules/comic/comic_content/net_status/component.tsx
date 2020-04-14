import React, { PureComponent } from 'react';

import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import Feather from 'react-native-vector-icons/Feather';

const ICON_SIZE = 12;
const ICON_COLOR = '#fff';

const WifiIcon = ({ name }) => <Feather name={name} size={ICON_SIZE} color={ICON_COLOR} />;

interface INetStatusState {
  net: string;
}

class NetStatusComponent extends PureComponent<{}, INetStatusState> {
  unsubscribe: () => void = null;

  state = {
    net: 'wifi',
  };
  constructor(props) {
    super(props);
    this.getNetStatus = this.getNetStatus.bind(this);
  }

  componentDidMount() {
    NetInfo.fetch().then(this.getNetStatus);
    this.unsubscribe = NetInfo.addEventListener(this.getNetStatus);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  getNetStatus({ type }: NetInfoState) {
    if (type === 'wifi') {
      this.setState({ net: type });
    } else if (type === 'none' || type === 'unknown') {
      this.setState({ net: 'wifi-off' });
    } else {
      this.setState({ net: 'bar-chart' });
    }
  }

  render() {
    const { net } = this.state;
    return <WifiIcon name={net} />;
  }
}

export default NetStatusComponent;
