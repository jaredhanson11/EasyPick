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

var populateNavbar = function() {
    var navbar_html = Handlebars.templates['nav']();
    $('.navigation').html(navbar_html);
};
