# Backbone Warden
Backbone Warden protects your data in Backbone Models by making the model data local and private.

## Why?
We have run into issues arising from developers accessing the data in models using dot notation, through the "attributes" attribute. Backbone Warden forces users to use get/set to change or access attributes on a Model. This makes sure that any change events you have attached to your Model are fired off when someone modifies your data.

## How It Works
First create a Backbone model definition, just like a normal Backbone application.

```javascript
var MyModel = Backbone.Model.extend({

		// Explicitly listing what attributes to expect in this model
		defaults: {
			name: '',
			profession: ''
		},

		initialize: function () {}

	});
```

Then, instead of creating a new instance of your model like this:

```javascript
var myNewModel = new Backbone.Model({attribute:value});

// OR

model: new MyModel({attribute:value}),
```

Create a new Warden, and pass the model definition as a parameter to the Warden:

```javascript
var myNewModel = new Backbone.Warden(MyModel,{attribute:value});

// OR

model: new Backbone.Warden(MyModel, {attribute:value}),
```

The Warden will create a copy of all the methods on your model, and create a passthrough, allowing you to still using the Warden like you would a normal model. All of Backbone's normal model methods are still available, and the change events still fire. Now your data is private, and only accessible through get/set.

Warden also has the additional data() method:

```javascript
// returns a copy of the data stored in the model
Warden.data();

// returns the value of the attribute from the model
Warden.data(attributeName);
```
