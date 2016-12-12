/**
 * Handles form submission for search page.
 * Created by Famien Koko
 */

$(function () {
    checkLogin();

    Handlebars.partials = Handlebars.templates;
    var insertSelector = '#results-div';

    // get courses tables using these selectors
    var courseTableSelector = '#courses-table';
    var courseInsertSelector = '#courses-table tbody';

    var coursesTable = $(courseTableSelector).DataTable();

    var allCourses;

    /** populate dropdown with courses */
    $.get('/courses/',
        {}, // search with empty params to get all classes
        function (res, textStatus, jqXHR) {
            var departments = [];
            allCourses = res.content;
            $.each(allCourses, function (i, course) {
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

    /** listener for department dropdown  */
    $('#department-number-select').change(function () {
        if ($('#department-number-select').val() != 'any') {
            // remove old courses
            $('#course-number-select').find('option:gt(0)').remove();

            // populates courses dropdown with only courses from the selected department
            var depCourses = allCourses.filter(function(course) {
                return course.department == $('#department-number-select').val();
            }).sort(function(course1, course2) {
                return course1.course_numbers - course2.course_numbers;
            });;

            // add courses to dropdown
            $.each(depCourses, function (i, course) {
                $('#course-number-select').append($('<option>').text(course.course_numbers).attr('value', course.course_numbers))
            });

            $('#course-number-div').css('display', 'inline-block');

        } else {
            // set course to 'any' if department is 'any'
            $('#course-number-select').val('any');
            $('#course-number-div').hide();
        }
    });

    /** search submit button listener */
    $('#search-form').submit(function (e) {
        e.preventDefault();

        var tags = $.map($('input:checked'), function (value, i) {
            return value['value'];
        });

        if (tags == []) tags = 'any'; // query parameters with 'any' will match all records for that field in the database api

        var course_numbers = $('#course-number-select').val();
        var total_units = $('#units-select').val();
        var department = $('#department-number-select').val();

        $.get('/courses/search',
            {
                department: department,
                course_numbers: course_numbers,
                tags: tags,
                total_units: total_units
            },
            function (res, textStatus, jqXHR) {
                coursesTable.clear();

                var courses = res.content;

                // apply stats filters
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
                        if (course.stats.grading_difficulty < $('#min-class-grading-difficulty-select').val()) {
                            return false;
                        }
                    }

                    if ($('#max-class-grading-difficulty-select').val()) {
                        if (course.stats.grading_difficulty > $('#max-class-grading-difficulty-select').val()) {
                            return false;
                        }
                    }

                    if ($('#min-class-satisfaction-select').val()) {
                        if (course.stats.overall_satisfaction < $('#min-class-satisfaction-select').val()) {
                            return false;
                        }
                    }

                    if ($('#max-class-satisfaction-select').val()) {
                        if (course.stats.overall_satisfaction > $('#max-class-satisfaction-select').val()) {
                            return false;
                        }
                    }

                    return true;
                });


                html = Handlebars.templates.courses_table_items({courses:filtered_courses});

                $(html).filter('tr').each(function (index) {
                    coursesTable.row.add(this); // add new data to datatable
                });

                $(courseInsertSelector).prepend(html);

                coursesTable.draw(); // refresh datatable
            }
        ).fail(function(xmlhttp) {
            var res = JSON.parse(xmlhttp.responseText);
            var html = Handlebars.templates.error_box(res);
            $(error_box).html(html);
        });
    });
});
