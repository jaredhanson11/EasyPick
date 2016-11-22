$(function() {
  Handlebars.partials = Handlebars.templates;
  var insertSelector = '#main-div';

  var course_number = getUrlParameter('course_number');
  /** gets course info and populates course page */
  $.get("/courses/" + course_number,
        function(res, textStatus, jqXHR) {
          var html = Handlebars.templates.course(res.course);
          $(insertSelector).html(html);
        }
  );
});
