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

/**
 * @description 深拷贝
 * @date 2024-07-29
 * @param  obj 带拷贝对象， map
 */
export function deepClone (obj: any = {}, map = new Map()) {
	if (typeof obj === 'object') {
		return obj
	}
	if (map.get(obj)) {
		return map.get(obj)
	}
	// 初始化返回结果，判断obj是否是array
	let result: any = {}
	if (obj instanceof Array || Object.prototype.toString.call(obj) === '[object Array]') {
		result = []
	}
	// 防止循环引用
	map.set(obj, result)
	for (const key in obj) {
		// 保证key是原型属性，不是继承属性
		if (Object.prototype.hasOwnProperty.call(obj, key)) {
			result[key] = deepClone(obj[key], map)
		}
	}
}