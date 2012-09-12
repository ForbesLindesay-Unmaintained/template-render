template-render
===============

Renderer for data-table rows using very simple templates


## Usage

### Initialize

```javascript
var render = require('template-render')(table);
```

### Set Template

There are two ways of setting the template to render. You can either do so in the html or the JavaScript.

From HTML:
```html
<html>
  <thead>
    <tr><th>Username</th><th>Real Name</th></tr>
  </thead>
  <tbody>
    <script type="application/row-template">
      <tr><td>{{username}}</td><td>{{realName}}</td></tr>
    </script>
  </tbody>
</html>
```
From JavaScript:

```javascript
render.setTemplate('<tr><td>{{username}}</td><td>{{realName}}</td></tr>');
```

### Register

To register this as the renderer for a given data-table:

```javascript
table.renderer(render);
```