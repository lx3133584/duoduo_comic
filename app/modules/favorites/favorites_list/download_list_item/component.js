import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Dimensions } from 'react-native';
import { Badge } from 'react-native-elements';
import { Bar } from 'react-native-progress';
import { LongListItem } from '@';
import { downloadStatus } from '@/favorites';
import { statCount } from 'utils';
import {
  green, yellow, brand_primary, red,
} from 'theme';

const { width: screenWidth } = Dimensions.get('window');
const ContainStyled = styled.View`
  flex-direction: row;
  padding: 8px;
`;
const BarContainStyled = styled.View`
  height: 48px;
  align-items: center;
  justify-content: center;
`;
const textStyle = {
  fontSize: 10,
};
const wrapperStyle = {
  marginRight: 10,
};
const greenBackground = {
  backgroundColor: green,
};
const yellowBackground = {
  backgroundColor: yellow,
};
const redBackground = {
  backgroundColor: red,
};
function DownloadListItem(props) {
  const {
    download_status, listMap,
  } = props;
  const list = Object.values(listMap);
  const total = list.length;
  const stat = statCount(list);
  const { done = 0 } = stat;
  return (
    <LongListItem {...props}>
      <BarContainStyled>
        {total ? <Bar progress={done / total} color={brand_primary} width={screenWidth - 200} /> : null}
      </BarContainStyled>
      <ContainStyled>
        <Badge
          value={downloadStatus[download_status]}
          textStyle={textStyle}
          wrapperStyle={wrapperStyle}
          containerStyle={download_status === 'done'
            ? greenBackground
            : download_status === 'error'
              ? redBackground
              : yellowBackground}
        />
      </ContainStyled>
    </LongListItem>
  );
}
DownloadListItem.propTypes = {
  download_status: PropTypes.string,
  listMap: PropTypes.shape().isRequired,
};
DownloadListItem.defaultProps = {
  download_status: 'error',
};
export default DownloadListItem;
