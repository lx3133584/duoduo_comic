import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Toast from 'react-native-root-toast';
import { TouchableOpacity, Dimensions, InteractionManager } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Header } from 'router';
import { ComicList } from '@/comic/comic_detail';
import { Footer } from '@/favorites/download_select';

const { width: screenWidth } = Dimensions.get('window');

const SaveTextStyled = styled.Text`
  color: #fff;
  font-size: 16px;
  padding: 0 10px;
`;

const TitleStyled = styled.Text`
  text-align: center;
  font-size: 18px;
  margin-left: ${screenWidth * 0.15};
  color: #333;
`;

class DownloadSelectComponent extends Component {
  static propTypes = {
    list: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string,
    })).isRequired,
    detail: ImmutablePropTypes.map.isRequired,
    add: PropTypes.func.isRequired,
  };

  state = {
    checkboxData: Immutable.Map(),
  };

  shouldComponentUpdate(nextProps, nextState) {
    const {
      checkboxData,
    } = this.state;
    return nextState.checkboxData !== checkboxData;
  }

  showToast = (message) => {
    Toast.show(message, {
      position: -70,
    });
  };

  selectAll = () => {
    const { list } = this.props;
    const { checkboxData } = this.state;
    this.setState({
      checkboxData: checkboxData.withMutations((map) => {
        let isSelectAll = true; // 是否已经全部选中
        list.forEach((item) => {
          if (!checkboxData.get(item.id)) isSelectAll = false;
          map.set(item.id, true);
        });
        if (isSelectAll) { // 如果已经全选则全部取消选择
          list.forEach((item) => {
            map.set(item.id, false);
          });
        }
      }),
    });
  }

  download = () => {
    const {
      detail, list, add,
    } = this.props;
    const { checkboxData } = this.state;
    const selectList = list.filter(item => checkboxData.get(item.id));
    if (!selectList.length) return;
    InteractionManager.runAfterInteractions(() => {
      add({ detail, list: selectList });
    });
    this.showToast('开始下载...');
    Actions.pop();
  }

  changeCheckbox = index => this.setState(state => ({ checkboxData: state.checkboxData.update(index, bool => !bool) }))

  renderSaveButton = isSelectAll => (
    <TouchableOpacity onPress={this.selectAll}>
      <SaveTextStyled>{isSelectAll ? '取消' : '全选'}</SaveTextStyled>
    </TouchableOpacity>
  );

  render() {
    const { checkboxData } = this.state;
    const { list } = this.props;
    const total = checkboxData.reduce((t, v) => {
      if (v) return t + 1;
      return t;
    }, 0);
    return [
      <Header
        key="header"
        customTitle="选择下载章节"
        rightComponent={this.renderSaveButton(total === list.length)}
        {...this.props}
      />,
      <ComicList
        key="main"
        checkboxData={checkboxData}
        changeCheckbox={this.changeCheckbox}
        showCheckbox
      />,
      <Footer
        buttonText="下载"
        key="footer"
        bottom={70}
        onPress={this.download}
      >
        <TitleStyled>已选择:  {total} 章</TitleStyled>
      </Footer>,
    ];
  }
}

export default DownloadSelectComponent;
