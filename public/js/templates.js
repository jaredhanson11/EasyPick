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
templates['courses_table_item'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<tr>\n    <td>"
    + alias4(((helper = (helper = helpers.course_numbers || (depth0 != null ? depth0.course_numbers : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"course_numbers","hash":{},"data":data}) : helper)))
    + "</td>\n    <td>"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</td>\n    <td>"
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
    return "<nav class=\"navbar navbar-default navbar-fixed-top\">\n  <div class=\"container-fluid\">\n    <div class=\"navbar-header\">\n      <a class=\"navbar-brand\" href='/'>EasyPick</a>\n    </div>\n    <ul class=\"nav navbar-nav\">\n      <li id='search'><a href='#search'>\n        <span class=\"glyphicon glyphicon-search\" aria-hidden=\"true\"></span>\n      </a></li>\n      <li id='home'><a href='/profile'>\n        <span class=\"glyphicon glyphicon-home\" aria-hidden=\"true\"></span>\n      </a></li>\n      <li id='recommendations'><a href='/recommendations'>\n        <span class=\"glyphicon glyphicon-thumbs-up\" aria-hidden=\"true\"></span>\n      </a></li>\n    </ul>\n    <ul class=\"nav navbar-nav navbar-right  \">\n      <li>\n        <button type=\"button\" class=\"btn btn-default navbar-btn\"\n          id=\"navbar-logout\">Logout</button>\n        </li>\n    </ul>\n  </div>\n</nav>\n\n<script src=\"/js/logout.js\"></script>\n";
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
    + "</h1>\n<h2>User info:</h2>\n<h3>Email:<p>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.profile : depth0)) != null ? stack1.email : stack1), depth0))
    + "</p></h3><br>\n<h3>First Name:</h3><input type=\"text\" id=\"first_name\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.profile : depth0)) != null ? stack1.first_name : stack1), depth0))
    + "\"><br>\n<h3>Last Name:</h3><input type=\"text\" id=\"last_name\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.profile : depth0)) != null ? stack1.last_name : stack1), depth0))
    + "\"><br>\n<h3>Major:</h3><input type=\"text\" id=\"major1\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.profile : depth0)) != null ? stack1.major1 : stack1), depth0))
    + "\"><br>\n<h3>Minor:</h3><input type=\"text\" id=\"minor\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.profile : depth0)) != null ? stack1.minor : stack1), depth0))
    + "\"><br>\n<h3>Graduation Year:</h3><input type=\"text\" id=\"graduation_year\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.profile : depth0)) != null ? stack1.graduation_year : stack1), depth0))
    + "\"><br>\n<button id=\"edit-user\" class=\"btn btn-default\">Submit Changes</button>\n\n<h2>Courses/Reviews:<h2>\n<a href=\"/profile/review\" id=\"add-review\" class=\"btn btn-default\">Add/Review Course:</a>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.profile : depth0)) != null ? stack1.course_reviews : stack1),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n";
},"usePartial":true,"useData":true});
templates['recommendation_item'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<tr>\n  <td>"
    + alias4(((helper = (helper = helpers.course_numbers || (depth0 != null ? depth0.course_numbers : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"course_numbers","hash":{},"data":data}) : helper)))
    + "</td>\n  <td>"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</td>\n  <td>"
    + alias4(((helper = (helper = helpers.units || (depth0 != null ? depth0.units : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"units","hash":{},"data":data}) : helper)))
    + "</td>\n  <td>"
    + alias4(((helper = (helper = helpers.ratings || (depth0 != null ? depth0.ratings : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"ratings","hash":{},"data":data}) : helper)))
    + "</td>\n</tr>";
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
    return "<h1>Course Review Form</h1>\n<h3>Course #</h3>\n<input type=\"text\" id=\"course-num\"><br>\n<button id=\"find-course\" class=\"btn btn-default\">Find Course</button>\n<br><br>\n<h5>Please answer some questions about the taking the class.</h5>\nSpring/Fall/Summer/IAP?\n<input type=\"text\" id=\"term\">\n<br>\nYear?\n<input type=\"text\" id=\"year\">\n<br>\nClass hours? (1-7)\n<input type=\"text\" id=\"class_hrs\">\n<br>\nOutside hours? (1-7)\n<input type=\"text\" id=\"outside_hrs\">\n<br>\nContent difficulty? (1-7)\n<input type=\"text\" id=\"content_difficulty\">\n<br>\nGrading difficulty? (1-7)\n<input type=\"text\" id=\"grading_difficulty\">\n<br>\nOverall satisfaction? (1-7)\n<input type=\"text\" id=\"overall_satisfaction\">\n<br>\n<button id=\"submit-review\" class=\"btn btn-default\">Review Course</button>\n";
},"useData":true});
templates['review_thumbnail'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<div class='review_thumbnail' id='"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.review : depth0)) != null ? stack1._id : stack1), depth0))
    + "'>\n    <h3>"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.review : depth0)) != null ? stack1.course : stack1)) != null ? stack1.course_numbers : stack1), depth0))
    + ": "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.review : depth0)) != null ? stack1.course : stack1)) != null ? stack1.name : stack1), depth0))
    + "</h3>\n    <p>Overall: "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.review : depth0)) != null ? stack1.overall_satisfaction : stack1), depth0))
    + "/7</p>\n</div>\n";
},"useData":true});
})();