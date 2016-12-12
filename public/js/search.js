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

    $("input[type='search'].form-control.input-sm").parent().remove();

    $('.slider-range').each(function() {
        var id = $(this).attr('id')
        var prefix = id.substring(0, id.length - 6);
        $(this).slider({
            min: 1,
            max: 7,
            range: true,
            values: [1, 7],
            slide: function(event, ui) {
                $('#' + prefix + '-display').text(ui.values[0] + ' - ' + ui.values[1]);
            }
        });
    });

    var allCourses;

    /**Populate dropdown with courses */
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
            $('#course-number-select').find('option:gt(1)').remove();

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

            $('#course-number-cell').css('display', 'inline-block');
        }  else {
            // set course to 'any' if department is 'any'
            $('#course-number-select').val('any');
            $('#course-number-cell').hide();
        }
    });

    //Search button
    $('#search-submit').click(function () {
        var tags = $.map($('input:checked'), function (value, i) {
            return value['value'];
        });

        if (tags.length == 0) {
            tags = 'any';//Query parameters with 'any' will match all records for that field in the database api
        }

        var course_numbers = $('#course-number-select').val();
        if (!course_numbers) {
            course_numbers = 'any';
        }

        var total_units = $('#units-select').val();
        if (!total_units) {
            total_units = 'any';
        }

        var department = $('#department-number-select').val();
        if (!department) {
            department = 'any';
        }

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
                    var min_class_hrs = $('#class-hours-range').slider("values", 0);
                    var max_class_hrs = $('#class-hours-range').slider("values", 1);
                    var min_outside_hrs = $('#outside-hours-range').slider("values", 0);
                    var max_outside_hrs = $('#outside-hours-range').slider("values", 1);
                    var min_content_difficulty = $('#content-difficulty-range').slider("values", 0);
                    var max_content_difficulty = $('#content-difficulty-range').slider("values", 1);
                    var min_grading_difficulty = $('#grading-difficulty-range').slider("values", 0);
                    var max_grading_difficulty = $('#grading-difficulty-range').slider("values", 1);
                    var min_satisfaction = $('#satisfaction-range').slider("values", 0);
                    var max_satisfaction = $('#satisfaction-range').slider("values", 1);

                    if (min_class_hrs > 1 && course.stats.class_hrs < min_class_hrs) {
                        return false;
                    }

                    if (max_class_hrs < 7 && course.stats.class_hrs > max_class_hrs) {
                        return false;
                    }

                    if (min_outside_hrs > 1 && course.stats.outside_hrs < min_outside_hrs) {
                        return false;
                    }

                    if (max_outside_hrs < 7 && course.stats.outside_hrs > max_outside_hrs) {
                        return false;
                    }

                    if (min_content_difficulty > 1 && course.stats.content_difficulty < min_content_difficulty) {
                        return false;
                    }

                    if (max_content_difficulty < 7 && course.stats.content_difficulty > max_content_difficulty) {
                        return false;
                    }

                    if (min_grading_difficulty > 1 && course.stats.grading_difficulty < min_grading_difficulty) {
                        return false;
                    }

                    if (max_grading_difficulty < 7 && course.stats.grading_difficulty > max_grading_difficulty) {
                        return false;
                    }

                    if (min_satisfaction > 1 && course.stats.overall_satisfaction < min_satisfaction) {
                        return false;
                    }

                    if (max_satisfaction < 7 && course.stats.overall_satisfaction > max_satisfaction) {
                        return false;
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
