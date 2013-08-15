Todos.RESTAdapter = DS.RESTAdapter.extend({
	serializer: DS.RESTSerializer.extend({
		primaryKey: function(type) {
			return '_id';
		},
		serializeId: function(id) {
			return id.toString();
		}
	})
})


Todos.Store = DS.Store.extend({
  revision: 12,
  adapter: Todos.RESTAdapter
});