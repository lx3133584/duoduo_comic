import React, { PureComponent } from 'react';
import { Dimensions, FlatList, Vibration } from 'react-native';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ListEmpty } from '..';

const { height } = Dimensions.get('window');

const ContainStyled = styled.View`
  margin: 10px 0;
`;
const TextStyled = styled.Text`
  text-align: center;
`;
const pattern = [0, 20];

function FooterComponent({ text }) {
  return (
    <ContainStyled>
      <TextStyled>
        {text}
      </TextStyled>
    </ContainStyled>
  );
}
FooterComponent.propTypes = {
  text: PropTypes.string,
};
FooterComponent.defaultProps = {
  text: '下面什么都没有了哦。',
};

function _keyExtractor(item) {
  return `${item[this.customkey]}`;
}

class LongListComponent extends PureComponent {
  static propTypes = {
    initPage: PropTypes.number,
    page: PropTypes.number,
    customkey: PropTypes.string,
    Item: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func,
    ]).isRequired,
    list: PropTypes.array.isRequired,
    onFetch: PropTypes.func,
    increasePage: PropTypes.func,
    callback: PropTypes.func,
    itemOnPress: PropTypes.func,
    itemOnLongPress: PropTypes.func,
    getRef: PropTypes.func,
    itemHeight: PropTypes.number,
    isLong: PropTypes.bool,
    horizontal: PropTypes.bool,
    showFooter: PropTypes.bool,
    emptyText: PropTypes.string,
  };

  static defaultProps = {
    initPage: 0,
    customkey: 'title',
    page: 0,
    onFetch: null,
    callback: f => f,
    increasePage: f => f,
    itemOnPress: f => f,
    itemOnLongPress: f => f,
    getRef: f => f,
    itemHeight: 140,
    isLong: false,
    horizontal: false,
    showFooter: false,
    emptyText: '这里什么都没有呢~',
  }

  constructor(props) {
    super(props);
    const { page, customkey } = props;
    this.state = {
      loading: false,
    };
    this.page = page || 0;
    this.customkey = customkey || 'title';
    this._onRefresh = this._onRefresh.bind(this);
    this._onFetch = this._onFetch.bind(this);
    this._renderItem = this._renderItem.bind(this);
    this._itemOnLongPress = this._itemOnLongPress.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { page } = this.props;
    if (nextProps.page !== page) this.page = nextProps.page;
  }

  _getItemLayout = (data, index) => {
    const { itemHeight } = this.props;
    return { length: itemHeight, offset: itemHeight * index, index };
  };

  _onFetch({ init }) {
    const { onFetch, callback, increasePage } = this.props;
    if (!onFetch) return;
    const { loading } = this.state;
    if (loading) return;
    this.setState({ loading: true });
    onFetch(this.page, init).then((res) => {
      this.setState({ loading: false });
      const data = res.value.result ? res.value.result.data : res.value.data;
      if (!res.error && data.length) {
        callback(this.page, init);
        this.page++;
        increasePage();
      }
    }).catch(() => {
      this.setState({ loading: false });
    });
  }

  _itemOnLongPress(...params) {
    Vibration.vibrate(pattern);
    const { itemOnLongPress } = this.props;
    itemOnLongPress(...params);
  }

  _renderItem({ item }) {
    const { Item, itemOnPress = f => f } = this.props;
    return <Item {...item} itemOnPress={itemOnPress} itemOnLongPress={this._itemOnLongPress} />;
  }

  _onRefresh() {
    const { increasePage } = this.props;
    this.page = 0;
    increasePage(0);
    this._onFetch({ init: true });
  }

  render() {
    const {
      list, getRef, isLong, showFooter, emptyText, itemHeight = 140,
    } = this.props;
    const { loading } = this.state;
    return (
      <FlatList
        ref={getRef}
        data={list}
        keyExtractor={_keyExtractor}
        renderItem={this._renderItem}
        onEndReached={isLong && this._onFetch}
        onEndReachedThreshold={1.6}
        onRefresh={this._onRefresh}
        refreshing={loading}
        getItemLayout={this._getItemLayout}
        initialNumToRender={Math.ceil(height / itemHeight)}
        ListEmptyComponent={() => <ListEmpty text={emptyText} />}
        ListFooterComponent={showFooter && list.length && FooterComponent}
        {...this.props}
      />
    );
  }
}

export default LongListComponent;
