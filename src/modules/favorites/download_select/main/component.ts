import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Toast from 'react-native-root-toast';
import { is } from 'immutable';
import { TouchableOpacity, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Header } from 'router';
import { ComicList } from '@/comic/comic_detail';
import { Footer } from '@/favorites/download_select';
import { wrapWithCheckBoxData, wrapWithCheckBoxDataType } from 'utils';

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

@wrapWithCheckBoxData
class DownloadSelectComponent extends Component {
  static propTypes = {
    list: ImmutablePropTypes.list.isRequired,
    flatList: ImmutablePropTypes.list.isRequired,
    detail: ImmutablePropTypes.map.isRequired,
    add: PropTypes.func.isRequired,
    ...wrapWithCheckBoxDataType,
  };

  shouldComponentUpdate(nextProps) {
    const {
      checkboxData,
    } = this.props;
    return !is(nextProps.checkboxData, checkboxData);
  }

  componentDidUpdate() {
    const { initCheckBoxData, flatList } = this.props;
    initCheckBoxData(flatList);
  }

  showToast = (message) => {
    Toast.show(message, {
      position: -70,
    });
  };

  download = () => {
    const {
      detail, list, add, selectedIdList,
    } = this.props;
    if (!selectedIdList.size) return;
    add({ detail, list, selectedList: selectedIdList });
    this.showToast('开始下载...');
    Actions.pop();
  }

  renderSaveButton = () => {
    const { selectAll, isSelectedAll } = this.props;
    return (
      <TouchableOpacity onPress={selectAll}>
        <SaveTextStyled>{isSelectedAll ? '取消' : '全选'}</SaveTextStyled>
      </TouchableOpacity>
    );
  }

  render() {
    const {
      checkboxData, changeCheckbox, totalSelected,
    } = this.props;
    return [
      <Header
        key="header"
        customTitle="选择下载章节"
        rightComponent={this.renderSaveButton()}
        {...this.props}
      />,
      <ComicList
        key="main"
        checkboxData={checkboxData}
        changeCheckbox={changeCheckbox}
        showCheckbox
      />,
      <Footer
        buttonText="下载"
        key="footer"
        bottom={70}
        onPress={this.download}
      >
        <TitleStyled>已选择:  {totalSelected} 章</TitleStyled>
      </Footer>,
    ];
  }
}

export default DownloadSelectComponent;
