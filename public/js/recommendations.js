var getCourseRecommendations = function(callback) {
	$.get("/recommendations/courses", function(res) {
		if (res.success) {
			callback(res.courses);
		}
	})
}

var populateRecommendations = function(recs) {
	var output = "<tr>\n<th>Course #</th>\n<th>Course Name</th>\n<th>Units</th>\n<th>Ratings</th>\n</tr>\n";
	var addRecommendation = function(rec) {
		output += "<tr>\n<td>" + rec.course_numbers + "</td>\n<td>" + rec.name + "</td>\n<td>" + rec.units + "</td>\n<td>3</td>\n</tr>\n";
	}
	each(recs, addRecommendation);
	$("#recommendations").html(output);
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