$(function() {
    checkLogin();

    Handlebars.partials = Handlebars.templates;

    var getCourseRecommendations = function(callback) {
        $.get("/recommendations/courses", function(res) {
            if (res.success) {
                callback(res.content.courses);
            }
        }).fail(function(xmlhttp) {
            if (xmlhttp.status === 401)
                window.location = "/";
        });
    }

    var populateRecommendations = function(recs) {
        var html = Handlebars.templates.recommendations({ recommendations: recs });
        $("#recommendations").html(html);
    }

    var updateRecommendations = function() {
        getCourseRecommendations(populateRecommendations);
    }

    var onLoad = function() {
         updateRecommendations();
    }

    if (document.readyState != 'loading'){
        onLoad();
    } else {
        document.addEventListener('DOMContentLoaded', onLoad);
    }
});
