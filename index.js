// dependencies
var read = require("fs").readFileSync;
var util = require("util");
var Handlebars = require("handlebars");
var debug = require("debug")("component-builder-hbs");

/**
 * Creates a function for pre-compiling any Handlebars templates in
 * your components.
 *
 * Available options:
 *  - extension {String}  Extension to process (default: "hbs")
 *
 * All other options will be passed to Handlebars.precompile
 *
 * @param {Object} options
 */
exports = module.exports = function (options) {
    if (!options) options = {};

    var ext = options.extension || "hbs";
    delete options.extension;

    debug("creating builder plugin function", options);

    return function (file, done) {
        // only run the transformation if the file extension matches
        if (file.extension !== ext) return done();

        debug("processing", file.filename);

        file.read(function (err, str) {
            if (err) {
                debug("error encountered while reading file", err);
                return done(err);
            }

            var tpl = Handlebars.precompile(str, options);
            var format = "module.exports = Handlebars.template(%s);";

            file.extension = "js";
            file.string = util.format(format, tpl);

            debug("handlebars template compiled", file.filename);
            done();
        });
    }
};

/**
 * This runtime string is exposed so you can inject it into your build,
 * rather than requiring the runtime to be either inlined with each
 * template, or added as a dependency for each component that uses
 * templates.
 *
 * See the README for more details.
 */
var runtime = require.resolve("handlebars/dist/handlebars.runtime.js");
exports.runtime = read(runtime);
