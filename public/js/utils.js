/**
 * utils methods
 */

/**
 * gets paramater with a given name from the current url
 * @param  {[type]} key name of the parameter
 * @return {[type]}     value of the parameter in the current url
 */
var getUrlParameter = function getUrlParameter(key) {
  var page_url = decodeURIComponent(window.location.search.substring(1));
  var url_variables = page_url.split('&');
  for (var i = 0; i < url_variables.length; i++) {
    var param_name = url_variables[i].split('=');

    if (param_name[0] === key) {
      return param_name[1] === undefined ? true : param_name[1];
    }
  }

  return undefined;
};

/**
 * adds a navbar to the page
 */
var populateNavbar = function() {
    var navbar_html = Handlebars.templates['nav']();
    $('.navigation').html(navbar_html);
};

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
