The Todo application tutorial from the ember.js website with an express/mongoDB backend and precompiled handlebars templates. This was meant to save myself (and hopefully anyone reading this) some googling.

= Notes = 

* Handlebars templates are precompileod when the app starts, in development use nodemon to restart app when changes are made (`nodemon -e js,handlebars app.js`). There's probably a better way to do this, but it works
* Uses connect-assets for serving client-side js and less files
* New releases of ember/handlebars can be dropped in 


= Credits = 

* Front end code copied from (http://emberjs.com/guides/getting-started/)
* Mapping mongoDB _id to ember model id code "borrowed" from http://dbushell.com/2013/04/25/ember-data-and-mongodb/  
* Handlebar precompiled code based off https://gist.github.com/garth/1622236 (modified to compile into a single file and handle sud-directories)


