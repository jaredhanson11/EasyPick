var GetCourseRecommendations = function(callback) {
	$.get("/recommendations/courses", function(res) {
		if (res.success) {
			callback(res.courseInfo);
		}
	})
}

var populateRecommendations = function(recs) {
	var output = "<tr>\n<th>Course #</th>\n<th>Course Name</th>\n<th>Units</th>\n<th>Ratings</th>\n</tr>\n";
	var addRecommendation = function(rec) {
		output += "<tr>\n<td>" + rec[0] + "</td>\n<td>" + rec[1] + "</td>\n<td>" + rec[2] + "</td>\n<td>" + rec[3] + "</td>\n</tr>\n";
	}
	each(recs, addRecommendation);
	$("#recommendations").html(output);
}

var updateRecommendations = function() {
	GetCourseRecommendations(populateRecommendations);
}

var onLoad = function() {
    updateRecommendations();
}

if (document.readyState != 'loading'){
	onLoad();
} else {
	document.addEventListener('DOMContentLoaded', onLoad);
}