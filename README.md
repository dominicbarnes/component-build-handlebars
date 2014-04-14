component-builder-hbs
=====================

A component (v1.0.0+ only) builder
[plugin](https://github.com/component/builder2.js/blob/master/docs/builders.md#plugins)
for [Handlebars](http://handlebarsjs.com/) template pre-compilation.

## Installation

```bash
npm i --save component-builder-hbs
```

## Usage

**NOTE**: There are 2 places that require your attention. First, you
need to add the plugin to the builder. Second, you need to add the
Handlebars runtime to your build.js. (either that, or include it on
your page via another `<script>` tag)

```js
var handlebars = require("component-builder-hbs");

// ...

// add the plugin to the builder
builder.use("templates", handlebars({
    // options for Handlebars.precompile here, but you usually don't need any
}));

// ...

// add the runtime to your build (it's an assumed global)
builder.scripts(function (err, js) {
    // ...
    write("build.js", handlebars.runtime + js);
});
```
