/* 校验手机号 */
export function judgeTel (val: string) {
	const telPattern = /^1[3456789]\d{9}$/
	return telPattern.test(val)
}
/* 校验身份证号 */
export function judgeIdCard (val: string) {
	const idCardPattern = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
	return idCardPattern.test(val)
}
/* 校验为正数 */
export function judgeNumber (val: string) {
	const isPositiveInteger = /^([1-9]\d*)(\.\d{1,6})?$|^0\.\d{1,6}?$|^0$/
	return isPositiveInteger.test(val)
}