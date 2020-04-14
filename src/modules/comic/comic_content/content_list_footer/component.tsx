import React, { PureComponent } from 'react';
import styled from 'styled-components/native';

import { Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import Image from 'react-native-fast-image';
import { Dimensions } from 'react-native';
import { IContainer } from './container';

const { width } = Dimensions.get('window');
const { preload, priority } = Image;

const height = 50;
const ContainStyled = styled.View`
  width: ${width};
  background-color: #ededed;
  flex-direction: row;
  justify-content: space-around;
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
  fontWeight: 'normal' as 'normal',
  color: '#666',
  fontSize: 14,
};
class ContentListFooterComponent extends PureComponent<IContainer> {
  static defaultProps = {
    next: null,
    content_cache: null,
  };

  componentDidMount() {
    const { next } = this.props;
    this.init(next);
  }

  componentWillReceiveProps(nextProps) {
    const { next } = this.props;
    if (nextProps.next && (nextProps.next.id !== next.id)) {
      this.init(nextProps.next);
    }
  }

  init = (next?: IItem) => {
    const { getList, content_cache } = this.props;
    if (!next || content_cache) return;
    (getList({ id: next.id, pre: true, page: 0 }) as any).then(({ value }) => { // 预加载
      const data = value.result.data.slice(0, 3);
      preload(data.map(item => ({
        uri: item.url,
        priority: priority.low,
      })));
    });
  }

  goNext = () => {
    const { next } = this.props;
    if (!next) return;
    const { id, title } = next;
    Actions.replace('comicContent', { chapter_id: id, title, pre: true });
  }

  render() {
    const { next } = this.props;
    const { title } = next || {};
    return (
      <ContainStyled>
        <Button
          buttonStyle={buttonStyle}
          title="返回目录"
          titleStyle={textStyle}
          onPress={() => Actions.pop()}
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
