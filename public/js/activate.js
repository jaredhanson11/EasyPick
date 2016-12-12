/** script for user activation */
$(function() {
  Handlebars.partials = Handlebars.templates;
  var token = getUrlParameter('token');
  console.log(token);
  /** gets course info and populates course page */
  $.post("/activate/" + token,
    function(res, textStatus, jqXHR) {
      alert("User activated!");
      window.location = "/";
  }).fail(function(xmlhttp) {
      alert("Invalid token!");
  });
});
