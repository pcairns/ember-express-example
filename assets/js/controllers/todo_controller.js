Todos.TodoController = Ember.ObjectController.extend({
	isEditing: false,

	isCompleted: function(key, value) {
		var model = this.get('model')

		if(value === undefined) {
			return model.get('isCompleted');
		} else {
			model.set('isCompleted', value);
			model.save();
			return value;
		}
	}.property('model.isCompleted'),

	editTodo: function() {
		console.log('in editTodo');
		this.set('isEditing', true);
	},

	acceptChanges: function() {
		this.set('isEditing', false);
		this.get('model').save();
	},

	removeTodo: function() {
		var todo = this.get('model');
		todo.deleteRecord();
		todo.save();
	}
});