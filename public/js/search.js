/**
 * Created by Famien Koko updated 11/22/2016.
 */
/**
 * Handles form submission for search page
 */

$(function () {
    checkLogin();

    Handlebars.partials = Handlebars.templates;
    var insertSelector = '#results-div';

    // get courses tables using these selectors
    var courseTableSelector = '#courses-table';
    var courseInsertSelector = '#courses-table tbody';

    var coursesTable = $(courseTableSelector).DataTable();

    //Populate dropdown with courses
    $.post('/courses/search',
        {},// search with empty params to get all classes
        function (res, textStatus, jqXHR) {
            $.each(res.content, function (i, course) {
                $('#course-number-select').append($('<option>').text(course.course_numbers).attr('value', course.course_numbers))
            });
        }
    ).fail(function(xmlhttp) {
        var res = JSON.parse(xmlhttp.responseText);
        var html = Handlebars.templates.error_box(res);
        $(error_box).html(html);
    });

    //Get Navbar
    populateNavbar();

    //Search button
    $('#search-form').submit(function (e) {
        e.preventDefault();

        var tags = $.map($('input:checked'), function (value, i) {
            return value['value'];
        });

        if (tags == []) tags = 'any';//Query parameters with 'any' will match all records for that field in the database api

        var course_numbers = $('#course-number-select').val();

        var total_units = $('#units-select').val();

        $.post('/courses/search',
            {
                course_numbers: course_numbers,
                tags: tags,
                total_units: total_units
            },
            function (res, textStatus, jqXHR) {
                coursesTable.clear();

                html = Handlebars.templates.courses_table_items({courses: res.content});

                $(html).filter('tr').each(function (index) {
                    coursesTable.row.add(this);//add new data to datatable
                });

                $(courseInsertSelector).prepend(html);

                coursesTable.draw();//refresh datatable
            }
        ).fail(function(xmlhttp) {
            var res = JSON.parse(xmlhttp.responseText);
            var html = Handlebars.templates.error_box(res);
            $(error_box).html(html);
        });

    });

    populateNavbar();
});
