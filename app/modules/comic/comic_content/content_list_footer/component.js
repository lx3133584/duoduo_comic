import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import Image from 'react-native-fast-image';
import Spinner from 'react-native-spinkit';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const { preload } = Image;

const height = 50;
const ContainStyled = styled.View`
  width: ${width};
  background-color: #ededed;
  flex-direction: row;
  justify-content: space-around;
`;
const LoadingContainStyled = styled.View`
  width: ${width};
  height: ${height};
  background-color: #282828;
  justify-content: center;
  align-items: center;
`;
const TextStyled = styled.Text`
  background-color: #ededed;
  text-align: center;
  font-size: 14px;
  color: #666;
  height: ${height};
  line-height: ${height};
  text-align: center;
`;
const buttonStyle = {
  backgroundColor: '#ededed',
  borderWidth: 0,
  borderRadius: 0,
  height,
  elevation: 0,
};
const textStyle = {
  fontWeight: 'normal',
  color: '#666',
  fontSize: 14,
};
class ContentListFooterComponent extends PureComponent {
  static propTypes = {
    next: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
    getList: PropTypes.func.isRequired,
    is_show_footer: PropTypes.bool,
  };

  static defaultProps = {
    next: {},
    is_show_footer: true,
  }

  componentDidMount() {
    const { next } = this.props;
    setTimeout(() => this.init(next), 3000);
  }

  componentWillReceiveProps(nextProps) {
    const { next } = this.props;
    if (nextProps.next.id !== next.id) {
      setTimeout(() => this.init(nextProps.next), 3000);
    }
  }

  init = (next) => {
    const { getList } = this.props;
    if (!next.id) return;
    getList({ id: next.id, pre: true, page: 0 }).then(({ value }) => { // 预加载
      const data = value.result.data.slice(0, 3);
      preload(data.map(item => ({
        uri: item.url,
      })));
    });
  };

  goNext = () => {
    const { next } = this.props;
    const { id, title } = next;
    Actions.replace('comicContent', { chapter_id: id, title, pre: true });
  };

  render() {
    const { next, is_show_footer } = this.props;
    const { title } = next;
    if (!is_show_footer) {
      return (
        <LoadingContainStyled>
          <Spinner
            type="ChasingDots"
            color="#fff"
            size={36}
          />
        </LoadingContainStyled>
      );
    }
    return (
      <ContainStyled>
        <Button
          buttonStyle={buttonStyle}
          title="返回目录"
          titleStyle={textStyle}
          onPress={Actions.pop}
        />
        {!title ? (
          <TextStyled>
已经看完啦
          </TextStyled>
        ) : (
          <Button
            buttonStyle={buttonStyle}
            title={`下一章：${title}`}
            titleStyle={textStyle}
            onPress={this.goNext}
          />
        )}
      </ContainStyled>
    );
  }
}

export default ContentListFooterComponent;
