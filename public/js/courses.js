$(function() {
  checkLogin();

  Handlebars.partials = Handlebars.templates;
  var insertSelector = '#main-div';
  var statsDiv = '#stats-div';
  var commentsDiv = '#comments-div';

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

  /** gets course stats and populates stats section */
  $.get("/courses/" + course_number + "/stats",
    function(res, textStatus, jqXHR) {
      var stats = res.content;

      var data = {
        labels: ["Class Hours", "Outside Hours", "Content Difficulty", "Grading Difficulty", "Overall Satisfaction"],
        datasets: [
            {
                label: "Class Stats",
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: [stats.class_hrs, stats.outside_hrs, stats.content_difficulty, stats.grading_difficulty, stats.overall_satisfaction]
            },
        ]
      };

      var option = {
        scaleOverride: true,
        scaleSteps: 7,
        scaleStepWidth: 1,
        scaleStartValue: 0,
        responsive: true,
      };

      var html = Handlebars.templates.course_stats();

      $(statsDiv).html(html).promise().done(function(){
        // Load data into the chart
        var ctx = document.getElementById("stats-canvas").getContext('2d');
        var chart = new Chart(ctx).Radar(data, option);
      });

  });

  /** gets course stats and populates stats section */
  $.get("/courses/" + course_number + "/comments",
    function(res, textStatus, jqXHR) {
      var html = Handlebars.templates.course_comments({ comments: res.content });
      $(commentsDiv).html(html);
  });

  populateNavbar();
});
