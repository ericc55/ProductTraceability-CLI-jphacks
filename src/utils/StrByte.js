function byteToString(byteStr) {
  const len = byteStr.length;
  let str = '';
  let i = 0;
  for (i = 0; i < len; i += 2) {
    if (byteStr[i] === '3') {
      str += byteStr[i + 1];
    }
    if (byteStr[i] === '2') {
      str += 'X';
    }
  }
  return str;
}
export default {
  byteToString,
};
