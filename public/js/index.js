/** event handler for signup button */
$(function() {
  Handlebars.partials = Handlebars.templates;

  /** event handler for signup button */
  $("#form-signup").click(function(e) {
    e.preventDefault();
    $.post("/users",
          {
            email: $("#email").val(),
            password: $("#password").val()
          },
          function(res, textStatus, jqXHR) {
            console.log(res);
            if(res.success) {
              window.location = "/profile";
            } else {
              alert("signup failed");
            }
          }
    );
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
            if (res.success) {
              console.log(res);
              window.location = "/profile";
            } else {
              alert("login failed");
            }
          });
  });

});

var populateNavbar = function() {
var navbar_html = Handlebars.templates['nav']();
$('.navigation').html(navbar_html);
};

