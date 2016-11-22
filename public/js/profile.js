$(function() {
    var populate_profile = function(){
        $.get('/users', function(resp) {
            if (resp.success) {
                var html = Handlebars.templates['profile'](resp.msg);
                $('.profile').html(html);
                $('.btn#edit-user').click(function(){
                    var updatedData = {
                        major1: $("input#major1").val(),
                        minor: $("input#minor").val(),
                        graduation_year: $("input#graduation_year").val(),
                        first_name: $("input#first_name").val(),
                        last_name: $("input#last_name").val(),
                    };

                    $.ajax({
                        url: '/users',
                        type: 'PUT',
                        data: JSON.stringify(updatedData),
                        dataType: 'json',
                        success: function(data) {
                        //or refresh
                            console.log(data);
                            alert('Successfully updated profile!');
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
