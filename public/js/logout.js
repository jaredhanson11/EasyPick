/** event handler for logout button */
$(function() {
  $("#navbar-logout").click(function() {
    $.post("/logout",
          function(res, textStatus, jqXHR) {
            window.location = "/";
          });
  });
});
