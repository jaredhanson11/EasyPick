$(function() {
    var populate_profile = function(){
        $.get('/users', function(resp) {
            console.log(resp.msg);
            if (resp.success) {
                var html = Handlebars.templates['profile'](resp.msg);
                $('.profile').html(html);
                $('.btn#edit-user').click(function(){
                    console.log($('input.major1'));
                    var updatedDataString = "major1=" + $("input#major1").val() + "&minor=" +
                    $("input#minor").val() + "&graduation_year=" + $("input#graduation_year").val() +
                    "&first_name=" + $("input#first_name").val() + "&last_name=" + $("input#last_name").val();

                    $.ajax({
                        url: '/users',
                        type: 'PUT',
                        data: updatedDataString,
                        success: function(data) {
                        //or refresh
                            populate_profile();
                        }
                    });
                })

            } else {
                alert(resp.msg);
                window.location.href = '/';
            }
        })
    };
    populate_profile();
    populateNavbar();
});

