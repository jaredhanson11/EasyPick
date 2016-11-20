/** event handler for signup button */
$(function() {
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
              window.location = "/users/" + res.userid;
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
              window.location = "/users/" + res.userid;
            } else {
              alert("login failed");
            }
          });
  });
});
