import { Dimensions } from 'react-native';

const { width: clientWidth } = Dimensions.get('window');

// 大数字格式化
export function numberFormat(num) {
  const n = +num || 0;
  switch (true) {
    case n < 10000:
      return n;
    case n >= 100000000:
      return `${(n / 100000000).toFixed(1)}亿`;
    case n >= 10000:
      return `${(n / 10000).toFixed(1)}万`;
    default:
      return n;
  }
}
// 获取图片的高
export function getImgHeight({ height, width }, myClientWidth = clientWidth) {
  return Math.round(height / width * myClientWidth);
}
