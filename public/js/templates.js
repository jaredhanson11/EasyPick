(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['nav'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<nav class=\"navbar navbar-default\">\n  <div class=\"container\">\n    <div class=\"navbar-header\">\n      <a class=\"navbar-brand\" href='/'>EasyPick</a>\n    </div>\n    <ul class=\"nav navbar-nav\">\n      <li id='search'><a href='#search'>Search</a></li>\n      <li id='recommendation'><a href='#recs'>Rec's</a></li>\n    </ul>\n  </div>\n</nav>\n";
},"useData":true});
templates['profile'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.review_thumbnail,depth0,{"name":"review_thumbnail","hash":{"review":depth0},"data":data,"indent":"  ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "First name:\n"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.profile : depth0)) != null ? stack1.first_name : stack1), depth0))
    + "\n<br>\nLast name:\n"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.profile : depth0)) != null ? stack1.last_name : stack1), depth0))
    + "\n<br>\nMajor:\n"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.profile : depth0)) != null ? stack1.major1 : stack1), depth0))
    + "\n<br>\nMinor:\n"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.profile : depth0)) != null ? stack1.minor : stack1), depth0))
    + "\n<br>\nGraduation Year:\n"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.profile : depth0)) != null ? stack1.graduation_year : stack1), depth0))
    + "\n<br>\nCourses:\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.profile : depth0)) != null ? stack1.course_reviews : stack1),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"usePartial":true,"useData":true});
templates['review_thumbnail'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<div class='review_thumbnail' id='"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.review : depth0)) != null ? stack1._id : stack1), depth0))
    + "'>\n    <h4>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.review : depth0)) != null ? stack1.offering : stack1)) != null ? stack1.course : stack1)) != null ? stack1.name : stack1), depth0))
    + "</h4>\n    <p>Overall: "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.review : depth0)) != null ? stack1.overall_satisfaction : stack1), depth0))
    + "/7</p>\n    <button>Edit Review</button>\n</div>\n";
},"useData":true});
})();