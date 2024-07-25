/**
 * @description 处理特殊单价的位数
 * @date 2024-07-25
 * @param price?:Date|string  传入的金额
 * @returns string
 */
export function getChoosePrice (price: any) {
  // 是否为整数
  if (parseInt(price) === parseFloat(price)) {
    // 是否为0
    if (price) {
      return getPriceSwitch(price, 0)
    } else {
      return '0'
    }
  } else {
    // 截取小数据后位数有几位默认保留几位
    const setJson = price.toString().split('.')
    const setLength = setJson[1].toString().split('').length
    return getPriceSwitch(price, setLength)
  }
}

/**
 * @description 金额格式化函数方法
 * @date 2024-07-25
 * @param price?:Date|string  传入的金额
 * @returns string
 */
export function getPriceSwitch (price: any, n?: number) {
  if (!n && n !== 0) n = 2
  if (!price && n === 2) {
    return '0.00'
  } else if (!price && n === 3) {
    return '0.000'
  }
  price = Number(price)
  // 将数据分割，保留两位小数
  price = price.toFixed(n)
  // 获取整数部分
  const intPart = Math.trunc(price)
  // 整数部分处理,增加,
  const intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
  // 预定义小数部分
  let floatPart = ''
  if (n === 2) {
    floatPart = '.00'
  } else if (n === 3) {
    floatPart = '.000'
  } else {
    floatPart = ''
  }
  // 将数据分割为小数部分和整数部分
  const newArr = price.toString().split('.')
  // 有小数部分
  if (newArr.length === 2) {
    floatPart = newArr[1].toString()
    // 取得小数部分
    return intPartFormat + '.' + floatPart
  }
  return intPartFormat + floatPart
}

/**
 * @description 格式化金钱
 * @date 2024-07-25
 * @param num:number
 * @returns string
 * const money = ThousandNum(20190214);---> money => "20,190,214"
 */
export const thousandNum = (num: number) =>
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

/**
 * @description 生成n位随机字符串
 * @date 2024-07-25
 * @param n=8 随机字符串的位数,默认为8位
 * @returns string
 */
export const randomId = (n = 8): string => {
  return Math.random()
    .toString(36)
    .slice(3, 3 + n)
}