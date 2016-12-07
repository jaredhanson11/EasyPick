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
            var departments = [];

            $.each(res.content, function (i, course) {
                if ($.inArray(course.department[0], departments) == -1) {
                    departments.push(course.department[0]);
                    $('#department-number-select').append($('<option>').text(course.department[0]).attr('value', course.department[0]))
                }
            });
        }
    ).fail(function(xmlhttp) {
        var res = JSON.parse(xmlhttp.responseText);
        var html = Handlebars.templates.error_box(res);
        $(error_box).html(html);
    });

    $('#department-number-select').change(function () {
        if ($('#department-number-select').val() != 'any') {

            $('#course-number-select').find('option:gt(0)').remove();// remove old courses

            //Populate dropdown with courses
            $.post('/courses/search',
                {
                    department: $('#department-number-select').val()
                },
                function (res, textStatus, jqXHR) {

                    $.each(res.content, function (i, course) {
                        $('#course-number-select').append($('<option>').text(course.course_numbers).attr('value', course.course_numbers))
                    });
                }
            ).fail(function (xmlhttp) {
                var res = JSON.parse(xmlhttp.responseText);
                var html = Handlebars.templates.error_box(res);
                $(error_box).html(html);
            });

            $('#course-number-div').css('display', 'inline-block');

        } else {

            $('#course-number-select').val('any'); // set course to 'any' if department is 'any'
            $('#course-number-div').hide();
        }
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

        var department = $('#department-number-select').val();

        $.post('/courses/search',
            {
                department: department,
                course_numbers: course_numbers,
                tags: tags,
                total_units: total_units
            },
            function (res, textStatus, jqXHR) {
                coursesTable.clear();

                var courses = res.content;

                var filtered_courses =  courses.filter(function (course) {
                    if ($('#min-class-hours-select').val()) {
                        if (course.stats.class_hrs < $('#min-class-hours-select').val()) {
                            return false;
                        }
                    }

                    if ($('#max-class-hours-select').val()) {
                        if (course.stats.class_hrs > $('#max-class-hours-select').val()) {
                            return false;
                        }
                    }

                    if ($('#min-class-content-difficulty-select').val()) {
                        if (course.stats.content_difficulty < $('#min-class-content-difficulty-select').val()) {
                            return false;
                        }
                    }

                    if ($('#max-class-content-difficulty-select').val()) {
                        if (course.stats.content_difficulty > $('#max-class-content-difficulty-select').val()) {
                            return false;
                        }
                    }

                    if ($('#min-class-grading-difficulty-select').val()) {
                        if (course.stats.content_difficulty < $('#min-class-grading-difficulty-select').val()) {
                            return false;
                        }
                    }

                    if ($('#max-class-grading-difficulty-select').val()) {
                        if (course.stats.content_difficulty > $('#max-class-grading-difficulty-select').val()) {
                            return false;
                        }
                    }

                    if ($('#min-class-satisfaction-select').val()) {
                        if (course.stats.content_difficulty < $('#min-class-satisfaction-select').val()) {
                            return false;
                        }
                    }

                    if ($('#max-class-satisfaction-select').val()) {
                        if (course.stats.content_difficulty > $('#max-class-satisfaction-select').val()) {
                            return false;
                        }
                    }

                    return true;
                });


                html = Handlebars.templates.courses_table_items({courses:filtered_courses});

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
