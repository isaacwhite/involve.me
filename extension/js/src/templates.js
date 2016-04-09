define(['handlebars'], function(Handlebars) {

this["JST"] = this["JST"] || {};

this["JST"]["modal"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var helper;

  return "<h5 class=\"location\">"
    + this.escapeExpression(((helper = (helper = helpers.location || (depth0 != null ? depth0.location : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"location","hash":{},"data":data}) : helper)))
    + "</h5>\n";
},"3":function(depth0,helpers,partials,data) {
    var stack1, alias1=this.lambda, alias2=this.escapeExpression;

  return "<span class=\"rating "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.rating : depth0)) != null ? stack1.description : stack1), depth0))
    + "\">\n"
    + ((stack1 = helpers.each.call(depth0,((stack1 = (depth0 != null ? depth0.rating : depth0)) != null ? stack1.dots : stack1),{"name":"each","hash":{},"fn":this.program(4, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.rating : depth0)) != null ? stack1.description : stack1), depth0))
    + "\n</span>\n";
},"4":function(depth0,helpers,partials,data) {
    var helper;

  return "    <i class=\"status-"
    + this.escapeExpression(((helper = (helper = helpers.state || (depth0 != null ? depth0.state : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"state","hash":{},"data":data}) : helper)))
    + "\"></i>\n";
},"6":function(depth0,helpers,partials,data) {
    return "<div class=\"get-involved\">\n    <div class=\"donate\">\n        <form>\n            <input type=\"text\"></input>\n            <button type=\"submit\">Donate</button>\n        </form>\n    </div>\n    <div class=\"volunteer\">\n        <a href=\"#\">Get involved</a>\n    </div>\n</div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<h4 class=\"name\">"
    + alias3(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + "</h4>\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.location : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.rating : depth0),{"name":"if","hash":{},"fn":this.program(3, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "<p class=\"description\">"
    + alias3(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"description","hash":{},"data":data}) : helper)))
    + "</p>\n<a href=\"#\" class=\"show-more\">More info</a>\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.full : depth0),{"name":"if","hash":{},"fn":this.program(6, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"useData":true});

return this["JST"];

});