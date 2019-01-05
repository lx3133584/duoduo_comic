import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import DeviceBattery from 'utils/react-native-device-battery';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components';

const ContainStyled = styled.view`
  flex-direction: row;
  align-items: center;
`;
const TextStyled = styled.text`
  color: #fff;
  font-size: 12px;
  margin-left: 5px;
`;

const ICON_COLOR = '#fff';

const IsChargingIcon = () => <Ionicons name="ios-battery-charging-outline" size={22} color={ICON_COLOR} />;
const BatteryIcons = ({ name }: { name: string }) => <FontAwesome name={name} size={14} color={ICON_COLOR} />;
BatteryIcons.propTypes = {
  name: PropTypes.string.isRequired,
};

class BatteryComponent extends PureComponent<object> {
  state = {
    battery_level: 1,
    is_charging: false,
  };

  constructor(props: object) {
    super(props);
    this.getBattery = this.getBattery.bind(this);
  }

  componentDidMount() {
    DeviceBattery.getBatteryLevel().then((battery_level: number) => this.setState({ battery_level }));
    DeviceBattery.isCharging().then((is_charging: boolean) => this.setState({ is_charging }));
    DeviceBattery.addListener(this.getBattery);
  }

  componentWillUnmount() {
    DeviceBattery.removeListener(this.getBattery);
  }

  getBattery(state: { level: number; charging: boolean }) {
    const { level, charging } = state;
    this.setState({ battery_level: level, is_charging: charging });
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