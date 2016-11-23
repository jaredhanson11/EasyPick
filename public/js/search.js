/**
 * Created by Famien Koko updated 11/22/2016.
 */
/**
 * Handles form submission for search page
 */

$(function () {
    Handlebars.partials = Handlebars.templates;
    var insertSelector = '#results-div';

    // get courses tables using these selectors
    var courseTableSelector = '#courses-table';
    var courseInsertSelector = '#courses-table tr:last';

    $.post('/courses/search',
        {},// search with empty params to get all classes
        function (res, textStatus, jqXHR) {
            $.each(res.courses, function (i, course) {
                $('#course-number-select').append($('<option>').text(course.course_numbers).attr('value', course.course_numbers))
            });
        }
    );

    $('#search-form').submit(function (e) {
        e.preventDefault();

        var tags = $.map($('input:checked'), function (value, i) {
            return value['value'];
        });
        
        if (tags == []) tags = 'any';

        var course_numbers = $('#course-number-select').val();

        var total_units = $('#units-select').val();

        $.post('/courses/search',
            {
                course_numbers: course_numbers,
                tags: tags,
                total_units: total_units
            },
            function (res, textStatus, jqXHR) {
                $(courseTableSelector).find('tr:gt(0)').remove();
                var html = Handlebars.templates.courses_table_items(res);
                $(courseInsertSelector).after(html);

            }
        );

    });
});