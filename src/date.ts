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
export const formatDateString = (dateString: any, pattern?: any): string => {
	if (!dateString) return ''
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

/**
 * @description 日期转时间戳
 * @date 2024-07-23
 * @param dateString?:Date|string  传入的日期，时间戳。 pattern  格式化规则，默认yyyy-MM-dd
 * @returns number
 */
export function parse (dateString: any, pattern?: any) {
  const matchs1 = pattern.match(SIGN_REGEXP)
  const matchs2 = dateString.match(/(\d)+/g)
  if (matchs1.length === matchs2.length) {
    const _date = new Date(1970, 0, 1)
    for (let i = 0; i < matchs1.length; i++) {
      const _int = parseInt(matchs2[i])
      const sign = matchs1[i]
      switch (sign.charAt(0)) {
        case 'y': _date.setFullYear(_int); break
        case 'M': _date.setMonth(_int - 1); break
        case 'd': _date.setDate(_int); break
        case 'h': _date.setHours(_int); break
        case 'm': _date.setMinutes(_int); break
        case 's': _date.setSeconds(_int); break
      }
    }
    return _date
  }
  return null
}

/**
 * @description 获取每月第一天
 * @date 2024-07-23
 * @param 
 * @returns string
 */
export function getLastMonthDay () {
  let year = new Date().getFullYear()
  let month = new Date().getMonth()
  if (month === 0) {
    year = year - 1
    month = 12
  }
  let monthStr = ''
  if (month < 10) {
    monthStr = '0' + month
  }
  return year + '-' + monthStr + '-' + '01'
}

/**
 * @description 计算停留时间,格式化成x天x小时x分这种形式
 * @date 2024-07-25
 * @param startTime:number  开始时间时间戳
 * @returns string
 */
export function getStayTime(startTime: number): string {
  const now = Date.now()
  const stayTime = now - startTime
  const dayTime = 1000 * 60 * 60 * 24
  const hourTime = 1000 * 60 * 60
  const minuteTime = 1000 * 60
  const days = Math.floor(stayTime / dayTime)
  const hours = Math.floor((stayTime - days * dayTime) / hourTime)
  const minutes = Math.floor(
    (stayTime - days * dayTime - hours * hourTime) / minuteTime
  )
  let result = ''
  if (days > 0) {
    result += `${days}天`
    if (hours === 0) {
      result += '0小时'
    }
  }
  if (hours > 0) {
    result += `${hours < 10 ? '0' + hours : hours}小时`
  }
  if (minutes > 0) {
    result += `${minutes < 10 ? '0' + minutes : minutes}分`
  } else {
    result += '0分'
  }
  return result
}

export function formatTime(time: number) {
  return time < 10 ? `0${time}` : `${time}`
}

// 格式化时间为几分钟前这种格式
/**
 * @description 格式化时间:一分钟内的，显示刚刚;一小时内的,显示xx分钟前;1-24小时内的，显示XX小时前;昨天发起的，显示昨天 时:分;前天发起的，显示前天 时:分;超过前天的，显示年-月-日 时:分
 * @date 2024-07-25
 * @param startTime:number  开始时间时间戳
 * @returns string
 */
export function getPassedTime(startTime: number): string {
  const now = Date.now()
  const passedTime = now - startTime
  const dayTime = 1000 * 60 * 60 * 24
  const hourTime = 1000 * 60 * 60
  const minuteTime = 1000 * 60
  const startDate = new Date(startTime)
  const year = startDate.getFullYear()
  const month = formatTime(startDate.getMonth() + 1)
  const day = formatTime(startDate.getDate())
  const hour = formatTime(startDate.getHours())
  const minutes = formatTime(startDate.getMinutes())
  // 一分钟内的，显示刚刚
  if (passedTime < minuteTime) {
    return '刚刚'
  }
  // 一小时内的,显示xx分钟前
  if (passedTime < hourTime) {
    return `${Math.floor(passedTime / minuteTime)}分钟前`
  }
  // 1-24小时内的，显示XX小时前
  if (passedTime < dayTime) {
    return `${Math.floor(passedTime / hourTime)}小时前`
  }
  // 昨天发起的，显示昨天 时:分；
  if (passedTime >= 0 && passedTime < dayTime) {
    const time = `${hour}:${minutes}`
    return `昨天 ${time}`
  }
  // 前天发起的，显示前天 时:分；
  if (passedTime >= dayTime && passedTime < 2 * dayTime) {
    const time = `${hour}:${minutes}`
    return `前天 ${time}`
  }
  // 超过前天的，显示年-月-日 时:分
  if (passedTime >= 3 * dayTime) {
    return `${year}-${month}-${day} ${hour}:${minutes}`
  }
  return ''
}