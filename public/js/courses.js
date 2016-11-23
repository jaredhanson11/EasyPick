$(function() {
  checkLogin();

  Handlebars.partials = Handlebars.templates;
  var insertSelector = '#main-div';
  var statsDiv = '#stats-div';

  var course_number = getUrlParameter('course_number');
  /** gets course info and populates course page */
  $.get("/courses/" + course_number,
    function(res, textStatus, jqXHR) {
      var html = Handlebars.templates.course(res.content);
      $(insertSelector).html(html);
      populateNavbar();
  }).fail(function(xmlhttp) {
    if (xmlhttp.status === 401)
      window.location = "/";
    if (xmlhttp.status === 404) {
      var res = JSON.parse(xmlhttp.responseText);
      var html = Handlebars.templates.error_box(res);
      $(insertSelector).html(html);
    }
  });

  /** gets course info and populates course page */
  $.get("/courses/" + course_number + "/stats",
    function(res, textStatus, jqXHR) {
      var html = Handlebars.templates.course_stats(res.content);
      $(statsDiv).html(html);
  });

  populateNavbar();
});
