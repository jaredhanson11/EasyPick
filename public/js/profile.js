$(function() {
    Handlebars.partials = Handlebars.templates;
    checkLogin();

    var populate_profile = function(){
        $.get('/users', function(resp) {
            if (resp.success) {
                var html = Handlebars.templates['profile'](resp.msg);
                $('.profile').html(html);
                populateWishlist(resp.msg.profile.wishlist);
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
                        data: updatedData,
                        dataType: 'json',
                        success: function(data) {
                        //or refresh
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

