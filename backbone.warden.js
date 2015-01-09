// Backbone.Warden v0.1
// Distributed Under MIT License

(function (factory){

	if (typeof define === "function" && define.amd) {
		// Register AMD module;
		define(['underscore','jquery','backbone'], factory);
	} else {
		// Run as a function
		factory(_, jQuery, Backbone);
	}

}(function(_, $, Backbone){

	Backbone.Warden = function(model, attributes, options) {
		// Create a local private version of the model
		var Model = new model(attributes, options);

		// Create passthrough functions of the Model's methods
		// on the Warden
		for (var i in Model) (function(key, fn){
			if (typeof fn === "function" && i != "constructor") {
				this[i] = function() {
					return fn.apply(Model, arguments);
				}
			}
		}).call(this, i, Model[i]);

		// Allow people to still get values from the attributes
		// stored on the model;
		this.data = function(key) {
			if (!key || key === "attributes") return _.extend({},Model.attributes);
			else if (typeof key === "string") return Model[key];
			else return undefined;		
		}
	}

}) // End Factory
) // End Anon Func.;