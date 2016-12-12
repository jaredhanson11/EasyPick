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

    $("input[type='search'].form-control.input-sm").attr('id', 'course-search-box');
    var oldParent = $('#course-search-box').parent()
    var newParent = oldParent.parent();
    var searchbox = $('#course-search-box').detach();
    oldParent.remove();
    searchbox.appendTo(newParent);
    searchbox.attr('placeholder', 'Course Number');
    searchbox.removeClass('form-control input-sm');
    searchbox.addClass('text-input');
    searchbox.after("<button type='button' class='search-btn glyphicon glyphicon-search' id='search-submit'></button>");

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

    //Populate dropdown with courses
    $.get('/courses/search',
        {}, // search with empty params to get all classes
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
            $.get('/courses/search',
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

    //Search button
    $('#search-submit').click(function () {
        var tags = $.map($('input:checked'), function (value, i) {
            return value['value'];
        });

        if (tags.length == 0) {
            tags = 'any';//Query parameters with 'any' will match all records for that field in the database api
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
                tags: tags,
                total_units: total_units
            },
            function (res, textStatus, jqXHR) {
                coursesTable.clear();

                var courses = res.content;

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

});
