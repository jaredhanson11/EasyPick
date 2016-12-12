$(function() {
    checkLogin();
    Handlebars.partials = Handlebars.templates;

    var populateProfile = function(){
        $.get('/users', function(resp) {
            if (resp.success) {
                var html = Handlebars.templates['profile']({ profile: resp.content });
                $('.profile').html(html);

                var $inputs = $('.resizing-input');
                var $profile_inputs = $inputs.find('input');

                function resizeProfileInfo() {
                    $('.profile_info').width(Math.max(150, Math.min(800, Math.ceil($('#first_name').outerWidth() + $('#last_name').outerWidth()) + 5)));
                }

                // Resize based on text if text.length > 0
                // Otherwise resize based on the placeholder
                function resizeForText(text) {
                    var $this = $(this);
                    if (!text.trim()) {
                        text = $this.attr('placeholder').trim();
                    }
                    var $span = $this.parent().find('span');
                    $span.text(text + '-');
                    var $inputSize = $span.width();
                    $this.css("width", $inputSize);
                }

                $profile_inputs.keypress(function (e) {
                    if (e.which && e.charCode) {
                        var c = String.fromCharCode(e.keyCode | e.charCode);
                        var $this = $(this);
                        resizeForText.call($this, $this.val() + c);
                    }
                });

                // Backspace event only fires for keyup
                $profile_inputs.keyup(function (e) { 
                    if (e.keyCode === 8 || e.keyCode === 46) {
                        resizeForText.call($(this), $(this).val());
                    }
                });

                $profile_inputs.each(function () {
                    var $this = $(this);
                    resizeForText.call($this, $this.val())
                });

                $profile_inputs.on("focus", function() {
                    var $this = $(this);
                    resizeForText.call($this, $this.val());
                })

                var $name_inputs = $("#first_name, #last_name");
                $name_inputs.on("focus", resizeProfileInfo);
                $name_inputs.keypress(resizeProfileInfo);
                $name_inputs.keyup(resizeProfileInfo);

                resizeProfileInfo();

                $('#edit-user').click(function(){
                    $profile_inputs.attr("disabled", false);
                    $profile_inputs.css("border-bottom", "1px solid #ccc");
                    $(this).hide();
                    $('#submit-profile').css("display", "block");
                })
                
                $('#submit-profile').click(function(){
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
                            $profile_inputs.attr("disabled", true);
                            $profile_inputs.css("border-bottom", "0px");
                            $('#submit-profile').css("display", "none");
                            $('#edit-user').css("display", "block");
                            populate_profile();
                        }
                    });
                })
                
                var reviews_html = Handlebars.templates['course_reviews'](resp.msg);
                $('.course_reviews').html(reviews_html);

                $('tr.review_thumbnail').each(function() {
                    $(this).toggleClass('expand').nextUntil('tr.review_thumbnail').slideToggle(0);
                })

                $('.review_thumbnail .sign').click(function() {
                    var $row = $(this).parent().parent();
                    $row.toggleClass('expand').nextUntil('tr.review_thumbnail').slideToggle(0);
                });

                populateWishlist(resp.content.wishlist);

                $('#wishlist .del-button').click(function(){
                    var courseNumber = $(this).attr('id');
                    $.ajax({
                        url: '/users/wishlist',
                        type: 'DELETE',
                        data: {'courseNumber': courseNumber, _csrf: $("#_csrf").val()},
                        success: function(data){
                            alert('Successfully deleted item!');
                            populate_profile();
                        }
                    });
                });

                function openWishlist() {
                    $("#wishlist").addClass("is-active");
                }

                function closeWishlist() {
                    $("#wishlist").removeClass("is-active");
                }

                $("#toggle_wishlist").click(function(e) {
                    e.preventDefault();
                    $("#wishlist").hasClass("is-active") ? closeWishlist() : openWishlist();
                });

            } else {
                alert(resp.msg);
                window.location.href = '/';
            }
        })
    };
    populateProfile();
});

