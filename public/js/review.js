$(function(){
    checkLogin();

    var course_id = false;
    var populate_review = function() {
        var html = Handlebars.templates['review_form']();
        $('.review-form').html(html);
        $('.review-form #form-info').slideToggle(0);
        var $year = $('select#year');
        for (var year = (new Date()).getFullYear(); year >= 1865; year--) {
            $year.append($('<option>', {value: year.toString(), text: year.toString()}));
        }
        function resetReviewForm() {
            $('.review-form #form-info select, .review-form #form-info input, .review-form #form-info textarea').val('');
        }
        $('#find-course').click(function(){
            var course_num = $("#course-num").val();
            resetReviewForm();
            $.get('/courses/'+course_num, function(resp){
                if (!course_id) {$('.review-form #form-info').slideToggle(300);}
                course_id = resp.content._id;
                $('#selected-course .course-text').text(resp.content.name);
            }).fail(function(xmlhttp) {
                if (course_id) {$('.review-form #form-info').slideToggle(300);}
                course_id = undefined;
                $('#selected-course .course-text').text("None");
                alert('course number not valid');
            });
        })
        $('#submit-review').click(function(){
            if (!course_id){
                alert("Try a new class number.");
            } else {
                var review = {
                    review_form: {
                        course: course_id,
                        term: $('select#term').val(),
                        year: $('select#year').val(),
                        class_hrs: $('input#class_hrs').val(),
                        outside_hrs: $('input#outside_hrs').val(),
                        content_difficulty: $('input#content_difficulty').val(),
                        grading_difficulty: $('input#grading_difficulty').val(),
                        overall_satisfaction: $('input#overall_satisfaction').val()
                    },
                    comment: {
                        content: $('textarea#comment').val(),
                        course: course_id
                    },
                    _csrf: $("#_csrf").val()
                };

                $.post('/users/review', review, function(resp){
                    if(!resp.success){
                        alert('Failed to post review, have you alredy tried to review this class?');
                        window.location.href = '/profile';
                    } else {
                        alert('Successfully posted review');
                        window.location.href = '/profile';
                    }
                }).fail(function(err){
                    var errMessage = err['responseJSON']['error']
                    alert(errMessage);
                    if (errMessage == 'Error, you already reviewed this course.'){
                        window.location.href = '/profile';
                    }
                });
            }
        });
    }

    populate_review();
});
