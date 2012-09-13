var domify = require('domify');
var escapeHTML = require('escape-html');

module.exports = renderer;
function renderer(table) {
  if (arguments.length === 0) return renderer;
  var template;
  var waitingForTemplate = [];
  function loadTemplate(callback) {
    if (template) {
      return callback(null, template);
    } else if (table.templates.rowTemplate) {
      template = table.templates.rowTemplate;
      return loadTemplate(callback);
    } else {
      waitingForTemplate.push(callback);
    }
  }

  function render(row, rows, index, id, callback) {
    loadTemplate(function (err, str) {
      if (err) return callback(err);
      var res;
      try {
        res = domify(renderTemplate(str, row).trim());
      } catch (ex) {
        return callback(ex);
      }
      return callback(null, res);
    });
  }

  render.setTemplate = setTemplate;
  function setTemplate(str) {
    template = str;
    for (var i = 0; i < waitingForTemplate.length; i++) {
      waitingForTemplate[i](null, template);
    }
    waitingForTemplate = null;
  }

  return render;
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