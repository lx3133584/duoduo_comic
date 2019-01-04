import { Dimensions } from 'react-native';

const { width: clientWidth } = Dimensions.get('window');

// 大数字格式化
export function numberFormat(num: string): string {
  const n = +num || 0;
  switch (true) {
    case n < 10000:
      return String(n);
    case n >= 100000000:
      return `${(n / 100000000).toFixed(1)}亿`;
    case n >= 10000:
      return `${(n / 10000).toFixed(1)}万`;
    default:
      return String(n);
  }
}
// 获取图片的高
export function getImgHeight({ height, width }: { height: number, width: number }, myClientWidth = clientWidth) {
  return Math.round(height / width * myClientWidth);
}

// 统计各个状态的数量
export function statCount(list, key = 'status') {
  const result = {};
  list.forEach((item) => {
    const status = item.get ? item.get(key) : item[key];
    const n = result[status] || 0;
    result[status] = n + 1;
  });
  return result;
}
