/** event handler for logout button */
$(function() {
  $("#navbar-logout").click(function() {
    $.post("/logout",
        {
          _csrf: $("#_csrf").val(),
        },
          function(res, textStatus, jqXHR) {
            window.location = "/";
          });
  });
});
