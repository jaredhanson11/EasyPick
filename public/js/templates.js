(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['comment'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<!-- comment partial -->\n<a href=\"#\" class=\"list-group-item row course-comment\">\n    <p>"
    + container.escapeExpression(((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"content","hash":{},"data":data}) : helper)))
    + "</p>\n\n    <!-- TODO: maybe add functionality to upvote and downvote -->\n    <button type=\"submit\" class=\"btn btn-default btn-xs\">\n        <span class=\"glyphicon glyphicon-thumbs-up\" aria-hidden=\"true\"></span>\n    </button>\n\n    <button type=\"submit\" class=\"btn btn-default btn-xs refreet-btn\">\n        <span class=\"glyphicon glyphicon-thumbs-down\" aria-hidden=\"true\"></span>\n    </button>\n</a>\n";
},"useData":true});
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
templates['course_comments'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.comment,depth0,{"name":"comment","data":data,"indent":"  ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<h2>Comments</h2>\n<ul class=\"list-group\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.comments : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</ul>\n";
},"usePartial":true,"useData":true});
templates['courses_table_item'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return "<tr>\r\n    <td><a href='/courses/?course_number="
    + alias4(((helper = (helper = helpers.course_numbers || (depth0 != null ? depth0.course_numbers : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"course_numbers","hash":{},"data":data}) : helper)))
    + "'>"
    + alias4(((helper = (helper = helpers.course_numbers || (depth0 != null ? depth0.course_numbers : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"course_numbers","hash":{},"data":data}) : helper)))
    + "</a></td>\r\n    <td>"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</td>\r\n    <td value="
    + alias4(((helper = (helper = helpers.total_units || (depth0 != null ? depth0.total_units : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"total_units","hash":{},"data":data}) : helper)))
    + ">"
    + alias4(((helper = (helper = helpers.units || (depth0 != null ? depth0.units : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"units","hash":{},"data":data}) : helper)))
    + "</td>\n    <td>"
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.stats : depth0)) != null ? stack1.class_hrs : stack1), depth0))
    + "</td>\n    <td>"
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.stats : depth0)) != null ? stack1.outside_hrs : stack1), depth0))
    + "</td>\n    <td>"
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.stats : depth0)) != null ? stack1.content_difficulty : stack1), depth0))
    + "</td>\n    <td>"
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.stats : depth0)) != null ? stack1.grading_difficulty : stack1), depth0))
    + "</td>\n    <td>"
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.stats : depth0)) != null ? stack1.overall_satisfaction : stack1), depth0))
    + "</td>\n</tr>\n";
},"useData":true});
templates['courses_table_items'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.courses_table_item,depth0,{"name":"courses_table_item","data":data,"indent":"    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.courses : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"usePartial":true,"useData":true});
templates['course_stats'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<h2>Statistics</h2>\r\n<p><b>Class Hours:</b> "
    + alias4(((helper = (helper = helpers.class_hrs || (depth0 != null ? depth0.class_hrs : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"class_hrs","hash":{},"data":data}) : helper)))
    + "</p>\r\n<p><b>Outside Hours:</b> "
    + alias4(((helper = (helper = helpers.outside_hrs || (depth0 != null ? depth0.outside_hrs : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"outside_hrs","hash":{},"data":data}) : helper)))
    + "</p>\r\n<p><b>Content Difficulty:</b> "
    + alias4(((helper = (helper = helpers.content_difficulty || (depth0 != null ? depth0.content_difficulty : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"content_difficulty","hash":{},"data":data}) : helper)))
    + "</p>\r\n<p><b>Grading Difficulty:</b> "
    + alias4(((helper = (helper = helpers.grading_difficulty || (depth0 != null ? depth0.grading_difficulty : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"grading_difficulty","hash":{},"data":data}) : helper)))
    + "</p>\r\n<p><b>Overall Satisfaction:</b> "
    + alias4(((helper = (helper = helpers.overall_satisfaction || (depth0 != null ? depth0.overall_satisfaction : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"overall_satisfaction","hash":{},"data":data}) : helper)))
    + "</p>";
},"useData":true});
templates['error_box'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"alert alert-danger\" id=\"error\">\r\n  <strong>Error:</strong> "
    + container.escapeExpression(((helper = (helper = helpers.error || (depth0 != null ? depth0.error : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"error","hash":{},"data":data}) : helper)))
    + "\r\n</div>";
},"useData":true});
templates['login_form'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<h1>EasyPick</h1>\r\n<div id=\"error\"></div>\r\n<form id=\"login-form\">\r\n  <div class=\"form-group\">\r\n    <label for=\"email-input\">MIT email</label>\r\n    <input type=\"text\" class=\"form-control\" id=\"email\"\r\n    name=\"email\" placeholder=\"\">\r\n    <label for=\"password-input\">Password</label>\r\n    <input type=\"password\" class=\"form-control\" id=\"password\"\r\n    name=\"password\" placeholder=\"\">\r\n  </div>\r\n  <button type=\"submit\" class=\"btn btn-primary\">Login</button>\r\n  <button class=\"btn btn-primary\" id=\"form-signup\">Sign up</button>\r\n</form>";
},"useData":true});
templates['nav'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<nav class=\"navbar navbar-default navbar-fixed-top\">\r\n  <div class=\"container-fluid\">\r\n    <div class=\"navbar-header\">\r\n      <a class=\"navbar-brand\" href='/'>EasyPick</a>\r\n    </div>\r\n    <ul class=\"nav navbar-nav\">\r\n      <li id='search'><a href='/search'>\r\n        <span class=\"glyphicon glyphicon-search\" aria-hidden=\"true\"></span>\r\n      </a></li>\r\n      <li id='home'><a href='/profile'>\r\n        <span class=\"glyphicon glyphicon-home\" aria-hidden=\"true\"></span>\r\n      </a></li>\r\n      <li id='recommendations'><a href='/recommendations'>\r\n        <span class=\"glyphicon glyphicon-thumbs-up\" aria-hidden=\"true\"></span>\r\n      </a></li>\r\n    </ul>\r\n    <ul class=\"nav navbar-nav navbar-right  \">\r\n      <li>\r\n        <button type=\"button\" class=\"btn btn-default navbar-btn\"\r\n          id=\"navbar-logout\">Logout</button>\r\n        </li>\r\n    </ul>\r\n  </div>\r\n</nav>\r\n\r\n<script src=\"/js/logout.js\"></script>\r\n";
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
    + "</h1>\r\n<h2>User Info:</h2>\r\n<table>\r\n<tr>\r\n  <td>Email:</td>\r\n  <td>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.profile : depth0)) != null ? stack1.email : stack1), depth0))
    + "\r\n</tr>\r\n<tr>\r\n  <td>First Name:</td>\r\n  <td><input type=\"text\" id=\"first_name\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.profile : depth0)) != null ? stack1.first_name : stack1), depth0))
    + "\"></td>\r\n</tr>\r\n<tr>\r\n  <td>Last Name:</td>\r\n  <td><input type=\"text\" id=\"last_name\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.profile : depth0)) != null ? stack1.last_name : stack1), depth0))
    + "\"></td>\r\n</tr>\r\n<tr>\r\n  <td>Major:</td>\r\n  <td><input type=\"text\" id=\"major1\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.profile : depth0)) != null ? stack1.major1 : stack1), depth0))
    + "\"></td>\r\n</tr>\r\n<tr>\r\n  <td>Minor:</td>\r\n  <td><input type=\"text\" id=\"minor\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.profile : depth0)) != null ? stack1.minor : stack1), depth0))
    + "\"></td>\r\n</tr>\r\n<tr>\r\n  <td>Graduation Year:</td>\r\n  <td><input type=\"text\" id=\"graduation_year\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.profile : depth0)) != null ? stack1.graduation_year : stack1), depth0))
    + "\"></td>\r\n</tr>\r\n</table>\r\n<br>\r\n<button id=\"edit-user\" class=\"btn btn-default\">Submit Changes</button>\r\n<h2>Courses/Reviews:</h2>\r\n<table>\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.profile : depth0)) != null ? stack1.course_reviews : stack1),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</table>\r\n<br>\r\n<a href=\"/profile/review\" id=\"add-review\" class=\"btn btn-default\">Add/Review Course:</a>\r\n";
},"usePartial":true,"useData":true});
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

  return "<tr>\r\n  <td><a href='/courses/?course_number="
    + alias4(((helper = (helper = helpers.course_numbers || (depth0 != null ? depth0.course_numbers : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"course_numbers","hash":{},"data":data}) : helper)))
    + "'>"
    + alias4(((helper = (helper = helpers.course_numbers || (depth0 != null ? depth0.course_numbers : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"course_numbers","hash":{},"data":data}) : helper)))
    + "</a></td>\r\n  <td>"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</td>\r\n  <td>"
    + alias4(((helper = (helper = helpers.units || (depth0 != null ? depth0.units : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"units","hash":{},"data":data}) : helper)))
    + "</td>\r\n  <td>"
    + alias4(((helper = (helper = helpers.ratings || (depth0 != null ? depth0.ratings : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"ratings","hash":{},"data":data}) : helper)))
    + "</td>\r\n</tr>\r\n";
},"useData":true});
templates['review_form'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<h1>Course Review Form</h1>\r\n<table>\r\n<tr>\r\n  <th>Course # Search: </th>\r\n  <td><input type=\"text\" id=\"course-num\"></td>\r\n</tr>\r\n</table>\r\n<button id=\"find-course\" class=\"btn btn-default\">Find Course</button>\r\n<br><br>\r\n<div id=\"selected-course\"><b>Course Selected:</b> None</div>\r\n<h5>Please answer some questions about the taking the class.</h5>\r\n<table>\r\n<tr>\r\n  <td>Spring/Fall/Summer/IAP?</td>\r\n  <td><input type=\"text\" id=\"term\"></td>\r\n</tr>\r\n<tr>\r\n  <td>Year?</td>\r\n  <td><input type=\"text\" id=\"year\"></td>\r\n</tr>\r\n<tr>\r\n  <td>Class Hours? (1-7)</td>\r\n  <td><input type=\"text\" id=\"class_hrs\"></td>\r\n</tr>\r\n<tr>\r\n  <td>Outside Hours? (1-7)</td>\r\n  <td><input type=\"text\" id=\"outside_hrs\"></td>\r\n</tr>\r\n<tr>\r\n  <td>Content Difficulty? (1-7)</td>\r\n  <td><input type=\"text\" id=\"content_difficulty\"></td>\r\n</tr>\r\n<tr>\r\n  <td>Grading Difficulty? (1-7)</td>\r\n  <td><input type=\"text\" id=\"grading_difficulty\"></td>\r\n</tr>\r\n<tr>\r\n  <td>Overall Satisfaction? (1-7)</td>\r\n  <td><input type=\"text\" id=\"overall_satisfaction\"></td>\r\n</tr>\r\n</table>\r\n<button id=\"submit-review\" class=\"btn btn-default\">Review Course</button>\r\n";
},"useData":true});
templates['review_thumbnail'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<tr class='review_thumbnail' id='"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.review : depth0)) != null ? stack1._id : stack1), depth0))
    + "'>\r\n    <th>"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.review : depth0)) != null ? stack1.course : stack1)) != null ? stack1.course_numbers : stack1), depth0))
    + ": "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.review : depth0)) != null ? stack1.course : stack1)) != null ? stack1.name : stack1), depth0))
    + "</th>\r\n</tr>\r\n<tr>\r\n    <td>Taken: "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.review : depth0)) != null ? stack1.term : stack1), depth0))
    + " "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.review : depth0)) != null ? stack1.year : stack1), depth0))
    + "</td>\r\n</tr>\r\n<tr>\r\n    <td>Overall: "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.review : depth0)) != null ? stack1.overall_satisfaction : stack1), depth0))
    + "/7</td>\r\n</tr>\r\n<tr>\r\n    <td>Class Time: "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.review : depth0)) != null ? stack1.class_hrs : stack1), depth0))
    + "/7</td>\r\n</tr>\r\n<tr>\r\n    <td>Outside Time: "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.review : depth0)) != null ? stack1.outside_hrs : stack1), depth0))
    + "/7</td>\r\n</tr>\r\n<tr>\r\n    <td>Grading Difficulty: "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.review : depth0)) != null ? stack1.grading_difficulty : stack1), depth0))
    + "/7</td>\r\n</tr>\r\n<tr>\r\n    <td>Content Difficulty: "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.review : depth0)) != null ? stack1.content_difficulty : stack1), depth0))
    + "/7</td>\r\n</tr>\r\n\r\n";
},"useData":true});
})();