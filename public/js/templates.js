(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['course'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<h1>"
    + alias4(((helper = (helper = helpers.course_numbers || (depth0 != null ? depth0.course_numbers : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"course_numbers","hash":{},"data":data}) : helper)))
    + " "
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</h1>\r\n<p><b>Units:</b> "
    + alias4(((helper = (helper = helpers.units || (depth0 != null ? depth0.units : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"units","hash":{},"data":data}) : helper)))
    + "</p>\r\n<p>"
    + alias4(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + "</p>";
},"useData":true});
templates['review_thumbnail'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<div class='review_thumbnail' id='"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.review : depth0)) != null ? stack1._id : stack1), depth0))
    + "'>\r\n    <h3>"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.review : depth0)) != null ? stack1.course : stack1)) != null ? stack1.course_numbers : stack1), depth0))
    + ": "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.review : depth0)) != null ? stack1.course : stack1)) != null ? stack1.name : stack1), depth0))
    + "</h3>\r\n    <p>Overall: "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.review : depth0)) != null ? stack1.overall_satisfaction : stack1), depth0))
    + "/7</p>\r\n</div>\r\n";
},"useData":true});
templates['review_form'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<h1>Course Review Form</h1>\r\n<h3>Course #</h3>\r\n<input type=\"text\" id=\"course-num\"><br>\r\n<button id=\"find-course\" class=\"btn btn-default\">Find Course</button>\r\n<br><br>\r\n<h5>Please answer some questions about the taking the class.</h5>\r\nSpring/Fall/Summer/IAP?\r\n<input type=\"text\" id=\"term\">\r\n<br>\r\nYear?\r\n<input type=\"text\" id=\"year\">\r\n<br>\r\nClass hours? (1-7)\r\n<input type=\"text\" id=\"class_hrs\">\r\n<br>\r\nOutside hours? (1-7)\r\n<input type=\"text\" id=\"outside_hrs\">\r\n<br>\r\nContent difficulty? (1-7)\r\n<input type=\"text\" id=\"content_difficulty\">\r\n<br>\r\nGrading difficulty? (1-7)\r\n<input type=\"text\" id=\"grading_difficulty\">\r\n<br>\r\nOverall satisfaction? (1-7)\r\n<input type=\"text\" id=\"overall_satisfaction\">\r\n<br>\r\n<button id=\"submit-review\" class=\"btn btn-default\">Review Course</button>\r\n";
},"useData":true});
templates['recommendations'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.recommendation_item,depth0,{"name":"recommendation_item","data":data,"indent":"  ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<tr>\r\n  <th>Course #</th>\r\n  <th>Course Name</th>\r\n  <th>Units</th>\r\n  <th>Ratings</th>\r\n</tr>\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.recommendations : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"usePartial":true,"useData":true});
templates['recommendation_item'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<tr>\r\n  <td>"
    + alias4(((helper = (helper = helpers.course_numbers || (depth0 != null ? depth0.course_numbers : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"course_numbers","hash":{},"data":data}) : helper)))
    + "</td>\r\n  <td>"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</td>\r\n  <td>"
    + alias4(((helper = (helper = helpers.units || (depth0 != null ? depth0.units : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"units","hash":{},"data":data}) : helper)))
    + "</td>\r\n  <td>"
    + alias4(((helper = (helper = helpers.ratings || (depth0 != null ? depth0.ratings : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"ratings","hash":{},"data":data}) : helper)))
    + "</td>\r\n</tr>";
},"useData":true});
templates['profile'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.review_thumbnail,depth0,{"name":"review_thumbnail","hash":{"review":depth0},"data":data,"indent":"  ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<h1>Welcome Back, "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.profile : depth0)) != null ? stack1.first_name : stack1), depth0))
    + " "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.profile : depth0)) != null ? stack1.last_name : stack1), depth0))
    + "</h1>\n<h2>User Info:</h2>\n<table>\n<tr>\n  <td>Email:</td>\n  <td>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.profile : depth0)) != null ? stack1.email : stack1), depth0))
    + "\n</tr>\n<tr>\n  <td>First Name:</td>\n  <td><input type=\"text\" id=\"first_name\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.profile : depth0)) != null ? stack1.first_name : stack1), depth0))
    + "\"></td>\n</tr>\n<tr>\n  <td>Last Name:</td>\n  <td><input type=\"text\" id=\"last_name\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.profile : depth0)) != null ? stack1.last_name : stack1), depth0))
    + "\"></td>\n</tr>\n<tr>\n  <td>Major:</td>\n  <td><input type=\"text\" id=\"major1\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.profile : depth0)) != null ? stack1.major1 : stack1), depth0))
    + "\"></td>\n</tr>\n<tr>\n  <td>Minor:</td>\n  <td><input type=\"text\" id=\"minor\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.profile : depth0)) != null ? stack1.minor : stack1), depth0))
    + "\"></td>\n</tr>\n<tr>\n  <td>Graduation Year:</td>\n  <td><input type=\"text\" id=\"graduation_year\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.profile : depth0)) != null ? stack1.graduation_year : stack1), depth0))
    + "\"></td>\n</tr>\n</table>\n<br>\n<button id=\"edit-user\" class=\"btn btn-default\">Submit Changes</button>\n<h2>Courses/Reviews:</h2>\n<table>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.profile : depth0)) != null ? stack1.course_reviews : stack1),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</table>\n<br>\n<a href=\"/profile/review\" id=\"add-review\" class=\"btn btn-default\">Add/Review Course:</a>\n";
},"usePartial":true,"useData":true});
templates['nav'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<nav class=\"navbar navbar-default navbar-fixed-top\">\r\n  <div class=\"container-fluid\">\r\n    <div class=\"navbar-header\">\r\n      <a class=\"navbar-brand\" href='/'>EasyPick</a>\r\n    </div>\r\n    <ul class=\"nav navbar-nav\">\r\n      <li id='search'><a href='/search'>\r\n        <span class=\"glyphicon glyphicon-search\" aria-hidden=\"true\"></span>\r\n      </a></li>\r\n      <li id='home'><a href='/profile'>\r\n        <span class=\"glyphicon glyphicon-home\" aria-hidden=\"true\"></span>\r\n      </a></li>\r\n      <li id='recommendations'><a href='/recommendations'>\r\n        <span class=\"glyphicon glyphicon-thumbs-up\" aria-hidden=\"true\"></span>\r\n      </a></li>\r\n    </ul>\r\n    <ul class=\"nav navbar-nav navbar-right  \">\r\n      <li>\r\n        <button type=\"button\" class=\"btn btn-default navbar-btn\"\r\n          id=\"navbar-logout\">Logout</button>\r\n        </li>\r\n    </ul>\r\n  </div>\r\n</nav>\r\n\r\n<script src=\"/js/logout.js\"></script>\r\n";
},"useData":true});
templates['login_form'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<h1>EasyPick</h1>\r\n<div id=\"error\"></div>\r\n<form id=\"login-form\">\r\n  <div class=\"form-group\">\r\n    <label for=\"email-input\">MIT email</label>\r\n    <input type=\"text\" class=\"form-control\" id=\"email\"\r\n    name=\"email\" placeholder=\"\">\r\n    <label for=\"password-input\">Password</label>\r\n    <input type=\"password\" class=\"form-control\" id=\"password\"\r\n    name=\"password\" placeholder=\"\">\r\n  </div>\r\n  <button type=\"submit\" class=\"btn btn-primary\">Login</button>\r\n  <button class=\"btn btn-primary\" id=\"form-signup\">Sign up</button>\r\n</form>";
},"useData":true});
templates['error_box'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"alert alert-danger\" id=\"error\">\r\n  <strong>Error:</strong> "
    + container.escapeExpression(((helper = (helper = helpers.error || (depth0 != null ? depth0.error : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"error","hash":{},"data":data}) : helper)))
    + "\r\n</div>";
},"useData":true});
templates['courses_table_item'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<tr>\r\n    <td>"
    + alias4(((helper = (helper = helpers.course_numbers || (depth0 != null ? depth0.course_numbers : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"course_numbers","hash":{},"data":data}) : helper)))
    + "</td>\r\n    <td>"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</td>\r\n    <td value="
    + alias4(((helper = (helper = helpers.total_units || (depth0 != null ? depth0.total_units : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"total_units","hash":{},"data":data}) : helper)))
    + ">"
    + alias4(((helper = (helper = helpers.units || (depth0 != null ? depth0.units : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"units","hash":{},"data":data}) : helper)))
    + "</td>\r\n    <td>"
    + alias4(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + "</td>\r\n</tr>\r\n";
},"useData":true});
templates['courses_table_items'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.courses_table_item,depth0,{"name":"courses_table_item","data":data,"indent":"    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.courses : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"usePartial":true,"useData":true});
templates['review_form'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<h1>Course Review Form</h1>\n<table>\n<tr>\n  <th>Course # Search: </th>\n  <td><input type=\"text\" id=\"course-num\"></td>\n</tr>\n</table>\n<button id=\"find-course\" class=\"btn btn-default\">Find Course</button>\n<br><br>\n<div id=\"selected-course\"><b>Course Selected:</b> None</div>\n<h5>Please answer some questions about the taking the class.</h5>\n<table>\n<tr>\n  <td>Spring/Fall/Summer/IAP?</td>\n  <td><input type=\"text\" id=\"term\"></td>\n</tr>\n<tr>\n  <td>Year?</td>\n  <td><input type=\"text\" id=\"year\"></td>\n</tr>\n<tr>\n  <td>Class Hours?</td>\n  <td><input type=\"text\" id=\"class_hrs\"></td>\n</tr>\n<tr>\n  <td>Outside Hours?</td>\n  <td><input type=\"text\" id=\"outside_hrs\"></td>\n</tr>\n<tr>\n  <td>Content Difficulty?</td>\n  <td><input type=\"text\" id=\"content_difficulty\"></td>\n</tr>\n<tr>\n  <td>Grading Difficulty?</td>\n  <td><input type=\"text\" id=\"grading_difficulty\"></td>\n</tr>\n<tr>\n  <td>Overall Satisfaction?</td>\n  <td><input type=\"text\" id=\"overall_satisfaction\"></td>\n</tr>\n</table>\n<button id=\"submit-review\" class=\"btn btn-default\">Review Course</button>\n";
},"useData":true});
templates['review_thumbnail'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<tr class='review_thumbnail' id='"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.review : depth0)) != null ? stack1._id : stack1), depth0))
    + "'>\n    <th>"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.review : depth0)) != null ? stack1.course : stack1)) != null ? stack1.course_numbers : stack1), depth0))
    + ": "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.review : depth0)) != null ? stack1.course : stack1)) != null ? stack1.name : stack1), depth0))
    + "</th>\n</tr>\n<tr>\n    <td>Taken: "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.review : depth0)) != null ? stack1.term : stack1), depth0))
    + " "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.review : depth0)) != null ? stack1.year : stack1), depth0))
    + "</td>\n</tr>\n<tr>\n    <td>Overall: "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.review : depth0)) != null ? stack1.overall_satisfaction : stack1), depth0))
    + "/7</td>\n</tr>\n<tr>\n    <td>Class Time: "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.review : depth0)) != null ? stack1.class_hrs : stack1), depth0))
    + "/7</td>\n</tr>\n<tr>\n    <td>Outside Time: "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.review : depth0)) != null ? stack1.outside_hrs : stack1), depth0))
    + "/7</td>\n</tr>\n<tr>\n    <td>Grading Difficulty: "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.review : depth0)) != null ? stack1.grading_difficulty : stack1), depth0))
    + "/7</td>\n</tr>\n<tr>\n    <td>Content Difficulty: "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.review : depth0)) != null ? stack1.content_difficulty : stack1), depth0))
    + "/7</td>\n</tr>\n\n";
},"useData":true});
})();