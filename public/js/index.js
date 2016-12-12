/** event handler for signup button */
$(function() {
    Handlebars.partials = Handlebars.templates;
    var error_box = '#error';
    var msg_box = '#msg-box';
    var main_div = '#main-div';

    $.get('/users', function(resp) {
        // user is logged in, redirect to profile
        if (resp.success) {
            window.location = "/profile";
        }
    }).fail(function(xmlhttp) {
        var res = JSON.parse(xmlhttp.responseText);
        var html = Handlebars.templates.login_form(res);
        $(main_div).html(html);
        addEventHandlers();
    });

    var addEventHandlers = function() {
        /** event handler for signup button */
        $("#form-signup").click(function(e) {
            e.preventDefault();
            $.post("/users",
                {
                    kerberos: $("#kerberos").val(),
                    password: $("#password").val(),
                    _csrf: $("#_csrf").val()
                },
                function(res, textStatus, jqXHR) {
                    var html = Handlebars.templates.msg_box({ msg: "Registered successfully. Verify your email before logging in."});
                    $(msg_box).html(html);
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
                    kerberos: $("#kerberos").val(),
                    password: $("#password").val(),
                    _csrf: $("#_csrf").val()
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

