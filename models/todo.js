module.exports = function(mongoose) {

	var TaskSchema = mongoose.Schema({
		title: String,
		is_completed: Boolean
	});

	return mongoose.model('Task', TaskSchema);
};