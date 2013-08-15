module.exports = function(mongoose) {

	var TodoSchema = mongoose.Schema({
		title: String,
		is_completed: Boolean
	});

	return mongoose.model('Todo', TodoSchema);
};