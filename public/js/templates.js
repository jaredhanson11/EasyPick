(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['course'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<h1>"
    + alias4(((helper = (helper = helpers.course_numbers || (depth0 != null ? depth0.course_numbers : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"course_numbers","hash":{},"data":data}) : helper)))
    + " "
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</h1>\n<p><b>Units:</b> "
    + alias4(((helper = (helper = helpers.units || (depth0 != null ? depth0.units : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"units","hash":{},"data":data}) : helper)))
    + "</p>\n<p>"
    + alias4(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + "</p>";
},"useData":true});
templates['course_stats'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<h2>Statistics</h2>\n<p><b>Class Hours:</b> "
    + alias4(((helper = (helper = helpers.class_hrs || (depth0 != null ? depth0.class_hrs : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"class_hrs","hash":{},"data":data}) : helper)))
    + "</p>\n<p><b>Outside Hours:</b> "
    + alias4(((helper = (helper = helpers.outside_hrs || (depth0 != null ? depth0.outside_hrs : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"outside_hrs","hash":{},"data":data}) : helper)))
    + "</p>\n<p><b>Content Difficulty:</b> "
    + alias4(((helper = (helper = helpers.content_difficulty || (depth0 != null ? depth0.content_difficulty : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"content_difficulty","hash":{},"data":data}) : helper)))
    + "</p>\n<p><b>Grading Difficulty:</b> "
    + alias4(((helper = (helper = helpers.grading_difficulty || (depth0 != null ? depth0.grading_difficulty : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"grading_difficulty","hash":{},"data":data}) : helper)))
    + "</p>\n<p><b>Overall Satisfaction:</b> "
    + alias4(((helper = (helper = helpers.overall_satisfaction || (depth0 != null ? depth0.overall_satisfaction : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"overall_satisfaction","hash":{},"data":data}) : helper)))
    + "</p>";
},"useData":true});
templates['courses_table_item'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<tr>\n    <td><a href='/courses/?course_number="
    + alias4(((helper = (helper = helpers.course_numbers || (depth0 != null ? depth0.course_numbers : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"course_numbers","hash":{},"data":data}) : helper)))
    + "'>"
    + alias4(((helper = (helper = helpers.course_numbers || (depth0 != null ? depth0.course_numbers : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"course_numbers","hash":{},"data":data}) : helper)))
    + "</a></td>\n    <td>"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</td>\n    <td value="
    + alias4(((helper = (helper = helpers.total_units || (depth0 != null ? depth0.total_units : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"total_units","hash":{},"data":data}) : helper)))
    + ">"
    + alias4(((helper = (helper = helpers.units || (depth0 != null ? depth0.units : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"units","hash":{},"data":data}) : helper)))
    + "</td>\n    <td>"
    + alias4(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + "</td>\n</tr>\n";
},"useData":true});
templates['courses_table_items'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.courses_table_item,depth0,{"name":"courses_table_item","data":data,"indent":"    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.courses : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"usePartial":true,"useData":true});
templates['error_box'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"alert alert-danger\" id=\"error\">\n  <strong>Error:</strong> "
    + container.escapeExpression(((helper = (helper = helpers.error || (depth0 != null ? depth0.error : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"error","hash":{},"data":data}) : helper)))
    + "\n</div>";
},"useData":true});
templates['login_form'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<h1>EasyPick</h1>\n<div id=\"error\"></div>\n<form id=\"login-form\">\n  <div class=\"form-group\">\n    <label for=\"email-input\">MIT email</label>\n    <input type=\"text\" class=\"form-control\" id=\"email\"\n    name=\"email\" placeholder=\"\">\n    <label for=\"password-input\">Password</label>\n    <input type=\"password\" class=\"form-control\" id=\"password\"\n    name=\"password\" placeholder=\"\">\n  </div>\n  <button type=\"submit\" class=\"btn btn-primary\">Login</button>\n  <button class=\"btn btn-primary\" id=\"form-signup\">Sign up</button>\n</form>";
},"useData":true});
templates['nav'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<nav class=\"navbar navbar-default navbar-fixed-top\">\n  <div class=\"container-fluid\">\n    <div class=\"navbar-header\">\n      <a class=\"navbar-brand\" href='/'>EasyPick</a>\n    </div>\n    <ul class=\"nav navbar-nav\">\n      <li id='search'><a href='/search'>\n        <span class=\"glyphicon glyphicon-search\" aria-hidden=\"true\"></span>\n      </a></li>\n      <li id='home'><a href='/profile'>\n        <span class=\"glyphicon glyphicon-home\" aria-hidden=\"true\"></span>\n      </a></li>\n      <li id='recommendations'><a href='/recommendations'>\n        <span class=\"glyphicon glyphicon-thumbs-up\" aria-hidden=\"true\"></span>\n      </a></li>\n    </ul>\n    <ul class=\"nav navbar-nav navbar-right  \">\n      <li>\n        <button type=\"button\" class=\"btn btn-default navbar-btn\"\n          id=\"navbar-logout\">Logout</button>\n        </li>\n    </ul>\n  </div>\n</nav>\n\n<script src=\"/js/logout.js\"></script>\n";
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
templates['recommendation_item'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<tr>\n  <td><a href='/courses/?course_number="
    + alias4(((helper = (helper = helpers.course_numbers || (depth0 != null ? depth0.course_numbers : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"course_numbers","hash":{},"data":data}) : helper)))
    + "'>"
    + alias4(((helper = (helper = helpers.course_numbers || (depth0 != null ? depth0.course_numbers : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"course_numbers","hash":{},"data":data}) : helper)))
    + "</a></td>\n  <td>"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</td>\n  <td>"
    + alias4(((helper = (helper = helpers.units || (depth0 != null ? depth0.units : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"units","hash":{},"data":data}) : helper)))
    + "</td>\n  <td>"
    + alias4(((helper = (helper = helpers.ratings || (depth0 != null ? depth0.ratings : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"ratings","hash":{},"data":data}) : helper)))
    + "</td>\n</tr>\n";
},"useData":true});
templates['recommendations'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.recommendation_item,depth0,{"name":"recommendation_item","data":data,"indent":"  ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<tr>\n  <th>Course #</th>\n  <th>Course Name</th>\n  <th>Units</th>\n  <th>Ratings</th>\n</tr>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.recommendations : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"usePartial":true,"useData":true});
templates['review_form'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<h1>Course Review Form</h1>\n<table>\n<tr>\n  <th>Course # Search: </th>\n  <td><input type=\"text\" id=\"course-num\"></td>\n</tr>\n</table>\n<button id=\"find-course\" class=\"btn btn-default\">Find Course</button>\n<br><br>\n<div id=\"selected-course\"><b>Course Selected:</b> None</div>\n<h5>Please answer some questions about the taking the class.</h5>\n<table>\n<tr>\n  <td>Spring/Fall/Summer/IAP?</td>\n  <td><input type=\"text\" id=\"term\"></td>\n</tr>\n<tr>\n  <td>Year?</td>\n  <td><input type=\"text\" id=\"year\"></td>\n</tr>\n<tr>\n  <td>Class Hours? (1-7)</td>\n  <td><input type=\"text\" id=\"class_hrs\"></td>\n</tr>\n<tr>\n  <td>Outside Hours? (1-7)</td>\n  <td><input type=\"text\" id=\"outside_hrs\"></td>\n</tr>\n<tr>\n  <td>Content Difficulty? (1-7)</td>\n  <td><input type=\"text\" id=\"content_difficulty\"></td>\n</tr>\n<tr>\n  <td>Grading Difficulty? (1-7)</td>\n  <td><input type=\"text\" id=\"grading_difficulty\"></td>\n</tr>\n<tr>\n  <td>Overall Satisfaction? (1-7)</td>\n  <td><input type=\"text\" id=\"overall_satisfaction\"></td>\n</tr>\n</table>\n<button id=\"submit-review\" class=\"btn btn-default\">Review Course</button>\n";
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