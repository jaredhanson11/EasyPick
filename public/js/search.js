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
    Handlebars.partials = Handlebars.templates;
    var insertSelector = '#results-div';

    // get courses tables using these selectors
    var courseTableSelector = '#courses-table';
    var courseInsertSelector = '#courses-table tr:last';


    $('#search-form').submit(function (e) {
        e.preventDefault();

        var course_numbers = [];
        if ($('#course-number-select').val()) course_numbers = $('#course-number-select').val();
        $.post('/courses/search',
            {
                course_numbers: course_numbers
            },
            function (res, textStatus, jqXHR) {
                $(courseTableSelector).find('tr:gt(0)').remove();
                var html = Handlebars.templates.courses_table_items(res);
                $(courseInsertSelector).after(html);

            }
        );
    });
});