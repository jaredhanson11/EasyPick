/**
 * Created by Famien Koko on 11/22/2016.
 */
/**
 * Created by Famien Koko on 11/20/2016.
 */
/**
 * Handles form submission for search page
 */

$(function () {
    $('#search-form').submit(function (e) {
        e.preventDefault();

        $.post('/courses/search',
            {
                course_numbers: $('#course-number-select').val(),
                units: $('#units-select').val()
            },
            function (res, textStatus, jqXHR) {
                console.log(res);
            }
        );
    });
});