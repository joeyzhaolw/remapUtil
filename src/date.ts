// 日期相关工具函数
const SIGN_REGEXP = /([yMdhsm])(\1*)/g
const DEFAULT_PATTERN = 'yyyy-MM-dd'

function padding (s: number | string, len: number) {
  const len1 = len - (s + '').length
  for (let i = 0; i < len1; i++) { s = '0' + s }
  return s
}

/**
 * @description 日期格式化
 * @date 2024-07-23
 * @param dateString?:Date|string  传入的日期，时间戳。 pattern  格式化规则，默认yyyy-MM-dd
 * @returns string
 */
export const formatDateString = (dateString?: any, pattern?: any): string => {
	if (!(dateString || dateString === 0)) return ''
  const date = new Date(dateString)
  pattern = pattern || DEFAULT_PATTERN
  return pattern.replace(SIGN_REGEXP, ($0: any) => {
    switch ($0.charAt(0)) {
      case 'y': return padding(date.getFullYear(), $0.length)
      case 'M': return padding(date.getMonth() + 1, $0.length)
      case 'd': return padding(date.getDate(), $0.length)
      case 'w': return date.getDay() + 1
      case 'h': return padding(date.getHours(), $0.length)
      case 'm': return padding(date.getMinutes(), $0.length)
      case 's': return padding(date.getSeconds(), $0.length)
    }
  })
}