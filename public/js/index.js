/** event handler for signup button */
$(function() {
  Handlebars.partials = Handlebars.templates;
  var error_box = '#error';
  var main_div = '#main-div';

  $.get('/users', function(resp) {
    // user is logged in, redirect to profile
    if (resp.success) {
      window.location = "/profile";
    }
  }).fail(function() {
    var html = Handlebars.templates.login_form();
    $(main_div).html(html);
    addEventHandlers();
  });

  var addEventHandlers = function() {
    /** event handler for signup button */
    $("#form-signup").click(function(e) {
      e.preventDefault();
      $.post("/users",
        {
          email: $("#email").val(),
          password: $("#password").val()
        },
        function(res, textStatus, jqXHR) {
          window.location = "/profile";
        }
      ).fail(function(xmlhttp) {
        var res = JSON.parse(xmlhttp.responseText);
        var html = Handlebars.templates.error_box(res);
        $(error_box).html(html);
      });
    });

    /** event handler for login button */
    $("#login-form").submit(function(e) {
      e.preventDefault();
      $.post("/login",
        {
          email: $("#email").val(),
          password: $("#password").val()
        },
        function(res, textStatus, jqXHR) {
          window.location = "/profile";
        }).fail(function(xmlhttp) {
          var res = JSON.parse(xmlhttp.responseText);
          var html = Handlebars.templates.error_box(res);
          $(error_box).html(html);
        });
    });
  }
});

