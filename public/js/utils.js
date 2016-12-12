/**
 * utils methods
 */

/**
 * gets paramater with a given name from the current url
 * @param  {string} key name of the parameter
 * @return {string}     value of the parameter in the current url
 */
var getUrlParameter = function(key) {
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
 * checks if there's a log in user. if there's populate the navbar. otherwise,
 * redirects to index page.
 */
var checkLogin = function() {
    $.get('/users', function(resp) {
        populateNavbar(resp);
    }).fail(function(xmlhttp) {
        if (xmlhttp.status === 401)
                window.location = "/";
    });
}
/**
 * adds a navbar to the DOM
 */
var populateNavbar = function(data) {
    var navbar_html = Handlebars.templates['nav'](data);
    $('.navigation').html(navbar_html);
};

/**
 * adds wishlist to the DOM
 * @param  {array} wishlist arrays containing the users's wishlisted courses
 */
var populateWishlist = function(wishlist) {
    var wishlist_html = Handlebars.templates['wishlist']({wishlist: wishlist});
    $('#wishlist').html(wishlist_html);
};

/**
 * Iterator functional that executes function f(i) for i = from --> i = to
 *
 * @param {Integer} from - Starting index for f
 * @param {Integer} to - End index for f
 * @param {Function} f - Function to execute
 */
var fromTo = function(from, to, f) {
    if (from > to) return;
    f(from);
    fromTo(from + 1, to, f);
}

/**
 * Iterator functional that executes a function on every element in an array
 *
 * @param {Array} a - Array to iterate over
 * @param {Function} f - Function to execute
 */
var each = function(a, f) {
    fromTo(0, a.length-1, function(i) {f(a[i]);});
}
