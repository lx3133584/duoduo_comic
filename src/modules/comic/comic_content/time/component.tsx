import React, { PureComponent } from 'react';
import styled from 'styled-components';

const TextStyled = styled.Text`
  color: #fff;
  font-size: 12px;
`;

function fillZero(num: number) {
  if (num < 10) return `0${num}`;
  return String(num);
}

class TimeComponent extends PureComponent<{}, {time: string}> {
  timer: NodeJS.Timer = null as any;
  readonly state = {
    time: '00:00',
  };
  constructor(props: {}) {
    super(props);
    this.getTime = this.getTime.bind(this);
  }

  componentDidMount() {
    this.getTime();
    this.timer = setInterval(this.getTime, 30000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  getTime() {
    const date = new Date();
    const hour = date.getHours();
    const minutes = date.getMinutes();
    this.setState({ time: `${fillZero(hour)}:${fillZero(minutes)}` });
  }

  render() {
    const { time } = this.state;
    return (
      <TextStyled>
        {time}
      </TextStyled>
    );
  }
}

export default TimeComponent;
