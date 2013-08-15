module.exports = function(config) {

    var fs = require('fs'),
        vm = require('vm'),
        path = require('path'),
        handlebarsjs = fs.readFileSync(config.handlebarsJs, 'utf8'),
        emberjs = fs.readFileSync(config.emberJs, 'utf8'),
        templatesDir = config.templateDir,
        outputFile = config.templateFile,
        i, result = '';

    function parseDir(dirPath, prefix) {
        var files = fs.readdirSync(dirPath);

        if(files.length) {
            for (i = 0; i < files.length; i++) {
                var filePath = dirPath + '/' + files[i];
                if (/\.handlebars$/.test(files[i])) {
                    result += compileHandlebarsTemplate(filePath, prefix);
                    result += "\n\n\n";
                    //process.stdout.write('.')
                } else if(fs.readdirSync(dirPath)) {
                    parseDir(filePath, prefix + files[i] + '/');
                }
            }
        }
    }

    function compileHandlebarsTemplate(file, prefix) {
        var jQuery = function () { return jQuery; };
            jQuery.ready = function () { return jQuery; };
            jQuery.inArray = function () { return jQuery; };
            jQuery.jquery = "1.7.1";
            jQuery.event = { fixHooks: {} };

        var element = {
            firstChild: function () { return element; },
            innerHTML: function () { return element; }
        };

        var sandbox = {
            // DOM
            document: {
                createRange: false,
                createElement: function () { return element; }
            },
            // Console
            console: console,
            // jQuery
            jQuery: jQuery,
            $: jQuery,
            // handlebars template to compile
            template: fs.readFileSync(file, 'utf8'),
            // compiled handlebars template
            templatejs: null
        };

        // window
        sandbox.window = sandbox;

        // create a context for the vm using the sandbox data
        var context = vm.createContext(sandbox);

        // load Handlebars and Ember into the sandbox
        vm.runInContext(handlebarsjs, context, 'ember.js');
        vm.runInContext(emberjs, context, 'ember.js');

        //compile the handlebars template inside the vm context
        vm.runInContext('templatejs = Ember.Handlebars.precompile(template).toString()', context);


        var fileName = path.basename(file);
        var namedTemplateJs = 'Ember.TEMPLATES["' +
             prefix + fileName.replace(/.handlebars/, '') +
            '"] = Ember.Handlebars.template(' + context.templatejs + ');';

        //extract the compiled template from the vm context and save to .js file,
        //implicitely adding template to Ember.TEMPLATES when it is required
        return namedTemplateJs;
    }   

    return {
        compile: function() {
            if(fs.existsSync(outputFile)) { fs.truncateSync(outputFile); }
            parseDir(templatesDir, '');
            fs.writeFileSync(outputFile, result, 'utf8');
        }
    };

}