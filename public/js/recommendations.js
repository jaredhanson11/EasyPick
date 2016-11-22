var GetCourseRecommendations = function(callback) {
	$.get("/users/recommendations", function(res) {
		if (res.success) {
			callback(res.recommendations);
		}
	})
	//return ['6.170', '6.828', '14.11', '21G.402'];
}

var GetCourseInfo = function(courseNumber, callback) {
	$.get("/courses/" + courseNumber, function(res) {
		if (res.success) {
			info = [res.course.name, res.course.units, 3];
			callback(info);
		}
	})
}

var populateRecommendations = function(recs) {
	for (var i = 0; i < recs.length; i++) {
		
	}
}

var updateRecommendations = function() {
	var recs = GetCourseRecommendations(populateRecommendations);
	var output = "<tr>\n<th>Course #</th>\n<th>Course Name</th>\n<th>Units</th>\n<th>Ratings</th>\n</tr>\n";
	var addRecommendation = function(rec) {
		var info = GetCourseInfo(rec);
		output += "<tr>\n<td>" + rec + "</td>\n<td>" + info[0] + "</td>\n<td>" + info[1] + "</td>\n<td>" + info[2] + "</td>\n</tr>\n";
	}
	each(recs, addRecommendation);
	$("#recommendations").html(output);
}

var onLoad = function() {
    updateRecommendations();
}

if (document.readyState != 'loading'){
	onLoad();
} else {
	document.addEventListener('DOMContentLoaded', onLoad);
}