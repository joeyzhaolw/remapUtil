/**
 * @description 防抖函数
 * @date 2024-07-25
 * @param  fn 方法， delay  时间
 * @returns 
 */
export const mydebounce = (fn: any, delay: number, immediate = false) => {
	let timer: NodeJS.Timeout | null = null
	let isInvoke = false
	const _debounce = function(this: any, ...args: any[]) {
		if (timer) clearTimeout(timer)
		if (!isInvoke && immediate) {
			fn.call(this, args)
			isInvoke = true
			return
		}
		timer = setTimeout(() => {
			fn.call(this, args)
			timer = null
			isInvoke = false
		}, delay)
	}
	_debounce.cancel = function() {
		if (timer) clearTimeout(timer)
		timer = null
		isInvoke = false
	}
	return _debounce
}

/**
 * @description 节流函数 myThrottle(fn, 500)
 * @date 2024-07-25
 * @param  fn 方法， delay  时间
 * @returns 
 */
export const myThrottle = (fn: any, interval: number, immediate = true) => {
	let startTime = 0
	const _throttle = function(this: any, ...args: any[]) {
		const nowTime = new Date().getTime()
		if (!immediate && startTime === 0) {
			startTime = nowTime
		}
		const waitTime = interval - (nowTime - startTime)
		if (waitTime <= 0) {
			fn.apply(this, args)
			startTime = nowTime
		}
	}
	return _throttle
}