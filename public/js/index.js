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
              window.location = "/profile?userid=" + res.userid;
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
              window.location = "/profile?userid=" + res.userid;
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

var getUrlParameter = function getUrlParameter(sParam) {
var sPageURL = decodeURIComponent(window.location.search.substring(1)),
  sURLVariables = sPageURL.split('&'),
  sParameterName,
  i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : sParameterName[1];
    }
  }
};

