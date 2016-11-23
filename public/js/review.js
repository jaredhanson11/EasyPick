$(function(){
    checkLogin();

    var course_id = false;
    var populate_review = function() {
        var html = Handlebars.templates['review_form']();
        $('.review-form').html(html);
        $('.btn#find-course').click(function(){
            var course_num = $("#course-num").val();
            $.get('/courses/'+course_num, function(resp){
                course_id = resp.content._id;
                $('#selected-course').html("<b>Course Selected:</b> " + resp.content.name);
            }).fail(function(xmlhttp) {
                course_id = undefined;
                $('#selected-course').html("<b>Course Selected:</b> None");
                alert('course number not valid');
            });
        })
        $('.btn#submit-review').click(function(){
            if (!course_id){
                alert("Try a new class number.");
            } else {
                var review_form = {
                    course: course_id,
                    term: $('input#term').val(),
                    year: $('input#year').val(),
                    class_hrs: $('input#class_hrs').val(),
                    outside_hrs: $('input#outside_hrs').val(),
                    content_difficulty: $('input#content_difficulty').val(),
                    grading_difficulty: $('input#grading_difficulty').val(),
                    overall_satisfaction: $('input#overall_satisfaction').val()
                };
                $.post('/users/review', review_form, function(resp){
                    if(!resp.success){
                        alert('Failed to post review, have you alredy tried to review this class?');
                        window.location.href = '/profile';
                    } else {
                        alert('Successfully posted review');
                        window.location.href = '/profile';
                    }
                })
            }
        });
    }
    populateNavbar();
    populate_review();
});
