import React, { PureComponent } from 'react';
import { NativeEventEmitter, NativeModules } from 'react-native';
import { getBatteryLevel, isBatteryCharging } from 'react-native-device-info';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components/native';

const ContainStyled = styled.View`
  flex-direction: row;
  align-items: center;
`;
const TextStyled = styled.Text`
  color: #fff;
  font-size: 12px;
  margin-left: 5px;
`;

const ICON_COLOR = '#fff';

const deviceInfoEmitter = new NativeEventEmitter(NativeModules.RNDeviceInfo);

const IsChargingIcon = () => <Ionicons name="ios-battery-charging-outline" size={22} color={ICON_COLOR} />;
const BatteryIcons = ({ name }: { name: string }) => <FontAwesome name={name} size={14} color={ICON_COLOR} />;
interface IState {
  battery_level: number;
  is_charging: boolean;
}

class BatteryComponent extends PureComponent<{}, IState> {
  // unsubscribe: () => void = null;
  state = {
    battery_level: 1,
    is_charging: false,
  };

  constructor(props: object) {
    super(props);
    this.getBattery = this.getBattery.bind(this);
    this.getCharging = this.getCharging.bind(this);
  }

  componentDidMount() {
    getBatteryLevel().then((battery_level: number) => this.setState({ battery_level }));
    isBatteryCharging().then((is_charging: boolean) => this.setState({ is_charging }));
    deviceInfoEmitter.addListener('RNDeviceInfo_batteryLevelDidChange', this.getBattery);
    deviceInfoEmitter.addListener('RNDeviceInfo_powerStateDidChange', this.getCharging);
  }

  componentWillUnmount() {
    // this.unsubscribe();
  }

  getBattery(level: number) {
    this.setState({ battery_level: level });
  }

  getCharging({ batteryState }: { batteryState: 'charging' }) {
    this.setState({ is_charging: batteryState === 'charging' });
  }

  render() {
    const { is_charging, battery_level } = this.state;
    const level = battery_level < 0 ? 1 : battery_level;
    const battery_icon_name = `battery-${Math.round(level * 4)}`;
    return (
      <ContainStyled>
        {is_charging ? <IsChargingIcon /> : <BatteryIcons name={battery_icon_name} />}
        <TextStyled>
          {`${~~(level * 100)}%`}
        </TextStyled>
      </ContainStyled>
    );
  }
}

export default BatteryComponent;
