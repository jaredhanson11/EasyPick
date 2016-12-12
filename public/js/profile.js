$(function() {
    checkLogin();
    Handlebars.partials = Handlebars.templates;

    var populateProfile = function(){
        $.get('/users', function(resp) {
            if (resp.success) {
                var html = Handlebars.templates['profile']({ profile: resp.content });
                $('.profile').html(html);
                populateWishlist(resp.content.wishlist);

                $('.wishlist .del-button').click(function(){
                    var courseNumber = $(this).attr('id');
                    $.ajax({
                        url: '/users/wishlist',
                        type: 'DELETE',
                        data: {'courseNumber': courseNumber, _csrf: $("#_csrf").val()},
                        success: function(data){
                            alert('Successfully deleted item!');
                            populateProfile();
                        }
                    });
                })


                $('.btn#edit-user').click(function(){
                    var updatedData = {
                        major1: $("input#major1").val(),
                        minor: $("input#minor").val(),
                        graduation_year: $("input#graduation_year").val(),
                        first_name: $("input#first_name").val(),
                        last_name: $("input#last_name").val(),
                        _csrf: $("#_csrf").val()
                    };

                    $.ajax({
                        url: '/users',
                        type: 'PUT',
                        data: updatedData,
                        dataType: 'json',
                        success: function(data) {
                        //or refresh
                            alert('Successfully updated profile!');
                            populateProfile();
                        }
                    });
                })

            } else {
                alert(resp.msg);
                window.location.href = '/';
            }
        })
    };
    populateProfile();
});

