$(function() {
    checkLogin();

    Handlebars.partials = Handlebars.templates;
    var insertSelector = '#main-div';
    var statsDiv = '#stats-div';
    var commentsDiv = '#comments-div';

    var ctx = document.getElementById("stats-canvas").getContext('2d');
    var chart;

    var course_number = getUrlParameter('course_number');

    /** gets course info and populates course page */
    $.get("/courses/" + course_number,
        function(res, textStatus, jqXHR) {
            var html = Handlebars.templates.course(res.content);
            $(insertSelector).html(html);
    }).fail(function(xmlhttp) {
        if (xmlhttp.status === 401)
            window.location = "/";
        if (xmlhttp.status === 404) {
            var res = JSON.parse(xmlhttp.responseText);
            var html = Handlebars.templates.error_box(res);
            $(insertSelector).html(html);
            $(statsDiv).empty();
            $(commentsDiv).empty();
        }
    });

    /**
     * makes a get request to get course stats and displays
     * the averages of each field in a radial graph
     */
    var showGeneralStats = function() {
        $.get("/courses/" + course_number + "/stats",
            function(res, textStatus, jqXHR) {
                var stats = res.content;

                var data = {
                    labels: ["Class Hours", "Outside Hours", "Content Difficulty", "Grading Difficulty", "Overall Satisfaction"],
                    datasets: [
                            {
                                label: "Class Stats",
                                fillColor: "rgba(151,187,205,0.2)",
                                strokeColor: "rgba(151,187,205,1)",
                                pointColor: "rgba(151,187,205,1)",
                                pointStrokeColor: "#fff",
                                pointHighlightFill: "#fff",
                                pointHighlightStroke: "rgba(151,187,205,1)",
                                data: [stats.class_hrs, stats.outside_hrs, stats.content_difficulty, stats.grading_difficulty, stats.overall_satisfaction]
                            },
                    ]
                };

                var option = {
                    scaleOverride: true,
                    scaleSteps: 7,
                    scaleStepWidth: 1,
                    scaleStartValue: 0,
                    responsive: true,
                };

                // Load data into the chart
                if (chart)
                    chart.destroy();

                chart = new Chart(ctx).Radar(data, option);
        });
    }

    /**
     * makes a get request to get course satisfaction per term
     * and displays it in a timeseries format
     */
    var showSatisfactionStats = function() {
        $.get("/courses/" + course_number + "/satisfaction",
            function(res, textStatus, jqXHR) {
                var stats = res.content;
                var data = {
                    labels: Object.keys(stats),
                    datasets: [
                            {
                                label: "Class Stats",
                                fillColor: "rgba(151,187,205,0.2)",
                                strokeColor: "rgba(151,187,205,1)",
                                pointColor: "rgba(151,187,205,1)",
                                pointStrokeColor: "#fff",
                                pointHighlightFill: "#fff",
                                pointHighlightStroke: "rgba(151,187,205,1)",
                                data: Object.keys(stats).map(function(key) {
                                    return stats[key];
                                })
                            },
                        ]
                };

                var option = {
                    scaleOverride: true,
                    scaleSteps: 7,
                    scaleStepWidth: 1,
                    scaleStartValue: 0,
                    responsive: true,
                };

                if (chart)
                    chart.destroy();

                chart = new Chart(ctx).Line(data, option);
        });
    }

    /** gets course stats and populates stats section */
    showGeneralStats();

    /** listeners for tab switching in stats section */
    $("#satisfaction-tab").click(function(e) {
        e.preventDefault();
        $(".active").removeClass("active");
        $(this).addClass("active");
        showSatisfactionStats();
    });

    $("#general-tab").click(function(e) {
        e.preventDefault();
        $(".active").removeClass("active");
        $(this).addClass("active");
        showGeneralStats();
    });

    /** gets course comments and populates comments section */
    $.get("/courses/" + course_number + "/comments",
        function(res, textStatus, jqXHR) {
            var html = Handlebars.templates.course_comments({ comments: res.content });
            $(commentsDiv).html(html);
    });

    /** add to wishlist listener */
    $('button.wishlist').click(function(){
        $.post('/users/wishlist', {courseNumber:course_number, _csrf: $("#_csrf").val()},
            function(res, textStatus, jqXHR){
                alert("Successfully added to wishlist");
            }).fail(function(err){
                alert("Class already in your wishlist");
            });
    });
});
