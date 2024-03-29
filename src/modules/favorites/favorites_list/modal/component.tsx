import React, { PureComponent } from 'react';

import styled from 'styled-components/native';
import { Button } from 'react-native-elements';
import { Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import { brand_primary } from 'theme';

const { width } = Dimensions.get('window');

const ContainStyled = styled.View`
  height: 150px;
  width: ${width * 0.75};
  background-color: #fff;
  padding: 15px 20px 0;
  border-radius: 8px;
  justify-content: space-around;
`;
const ContentContainStyled = styled.Text`
  padding: 0 15px;
  color: #333;
  font-size: 16px;
`;
const ButtonContainStyled = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;
const containStyle = {
  justifyContent: 'center' as 'center',
  alignItems: 'center' as 'center',
};
const confirmButtonStyle = {
  backgroundColor: brand_primary,
  width: 85,
  height: 40,
  borderRadius: 8,
  elevation: 0,
};
const confirmTextStyle = {
  fontSize: 14,
  color: '#fff',
  textAlign: 'justify' as 'justify',
};
const cancelButtonStyle = {
  backgroundColor: '#fff',
  width: 85,
  height: 40,
  borderRadius: 6,
  borderWidth: 1,
  borderColor: '#999',
  elevation: 0,
};
const cancelTextStyle = {
  fontSize: 14,
  color: '#666',
  textAlign: 'justify' as 'justify',
};
interface IProps {
  isVisible?: boolean;
  confirm?(): void;
  cancel?(): void;
}

class ModalComponent extends PureComponent<IProps> {

  static defaultProps = {
    isVisible: false,
  };

  constructor(props) {
    super(props);
    this._cancel = this._cancel.bind(this);
    this._confirm = this._confirm.bind(this);
  }

  _cancel() {
    const { cancel } = this.props;
    cancel && cancel();
  }

  _confirm() {
    const { confirm } = this.props;
    confirm && confirm();
  }

  render() {
    const { isVisible, children } = this.props;
    return (
      <Modal
        isVisible={isVisible}
        useNativeDriver
        hideModalContentWhileAnimating
        onBackdropPress={this._cancel}
        animationIn="bounceInDown"
        animationOut="bounceOutUp"
        style={containStyle}
      >
        <ContainStyled>
          <ContentContainStyled>
            {children}
          </ContentContainStyled>
          <ButtonContainStyled>
            <Button
              title="取  消"
              titleStyle={cancelTextStyle}
              buttonStyle={cancelButtonStyle}
              onPress={this._cancel}
            />
            <Button
              title="确  定"
              titleStyle={confirmTextStyle}
              buttonStyle={confirmButtonStyle}
              onPress={this._confirm}
            />
          </ButtonContainStyled>
        </ContainStyled>
      </Modal>
    );
  }
}

export default ModalComponent;
