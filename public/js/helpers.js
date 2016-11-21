/**
 * Iterator functional that executes function f(i) for i = from --> i = to
 *
 * @param {Integer} from - Starting index for f
 * @param {Integer} to - End index for f
 * @param {Function} f - Function to execute
 */
var from_to = function(from, to, f) {
	if (from > to) return;
	f(from);
	from_to(from + 1, to, f);
}

/**
 * Iterator functional that executes a function on every element in an array
 *
 * @param {Array} a - Array to iterate over
 * @param {Function} f - Function to execute
 */
var each = function(a, f) {
	from_to(0, a.length-1, function(i) {f(a[i]);});
}