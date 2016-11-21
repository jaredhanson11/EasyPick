var GetCourseRecommendations = function(callback) {
	$.get("/users/recommendations", function(res) {
		if (res.success) {
			callback(res.recommendations);
		}
	})
	//return ['6.170', '6.828', '14.11', '21G.402'];
}

var GetCourseInfo = function(courseNumber) {
	var info = [];
	switch (courseNumber) {
		case '6.170':
			info = ['Software Studio', 12, 3];
			break;
		case '6.828':
			info = ['Operating Systems', 12, 3];
			break;
		case '14.11':
			info = ['Economics of Crime', 12, 3];
			break;
		case '21G.402':
			info = ['German II', 12, 3];
			break;
	}
	return info;
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