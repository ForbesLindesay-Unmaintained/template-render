var domify = require('domify');
var escapeHTML = require('escape-html');

module.exports = renderer;
function renderer(tableOrTemplate) {
  if (arguments.length === 0) return renderer;
  var template;

  function render(row, rows, index, id, callback) {
    var res;
    try {
      res = domify(renderTemplate(template, row).trim());
    } catch (ex) {
      return callback(ex);
    }
    return callback(null, res);
  }

  if (typeof tableOrTemplate === 'string') {
    template = tableOrTemplate;
    return constant(render); //template set manually, will be called again and passed a table (which we ignore)
  } else if (typeof tableOrTemplate === 'object' && typeof tableOrTemplate.templates === 'object' && typeof tableOrTemplate.templates.rowTemplate === 'string') {
    template = tableOrTemplate.templates.rowTemplate;
    return render;
  } else {
    throw new Error('You must define a template.');
  }
}

function renderTemplate(string, object) {
  return string.replace(/\{\{(\{?\w+\}?)\}\}/g, function (_, name) {
    var unescaped = /\{(\w+)\}/.exec(name);
    if (unescaped) {
      return object[unescaped[1]];
    } else {
      return escapeHTML(object[name]);
    }
  });
}

function constant(val) {
  return function () {
    return val;
  };
}