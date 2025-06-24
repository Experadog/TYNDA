export const isDate = (val: unknown): val is Date =>
	Object.prototype.toString.call(val) === '[object Date]';
