module.exports = function(Todo) {

	var listTodos, updateTodo, createTodo, deleteTodo;

	listTodos = function(req, res) {
		var id = req.params.id,
			search = (id? {'_id': id} : {});

		console.log(search);

		Todo.find(search, null, null, function(err, doc) {
			if(err) { console.log(err);}
			res.send({todos: doc});
		});
	};

	updateTodo = function(req, res) {
		var id = req.params.id;
		Todo.update({_id: id}, { $set: req.body.todo }, function(err){
			res.send({});
		});
	};

	createTodo = function(req, res) {
		var todo = new Todo(req.body.todo);
		todo.save(function(err) {
			res.send({});
		});
	};

	deleteTodo = function(req, res) {
		Todo.remove({_id: req.params.id}, function(err) {
			res.send({});
		});
	};

	return {
		'get': listTodos,
		'create': createTodo,
		'update': updateTodo,
		'delete': deleteTodo
	};
};