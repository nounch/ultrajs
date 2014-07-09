# UltraJS

## Synopsis

UltraJS is an ultra-fallback renderer for JSON data. It renders any
valid JSON input using basic HTML markup while the data is rendered as
is. This can be used when JSON data is received for which the semantic
structure is still unknow. The markup of individual elements can be
specified by providing custom HTML. So, for instance, elements of
certain JavaScript data types (`string`, `number`, `boolean`, ...)  or
classes (`Array`, `Function`, `RegExp`, ...) can be altered. UltraJS
also tries to automatically insert `<a>` tags for links and it allows
to differentiate arrays from other objects.

## Output

### Using `<div>` tags

The output is rendered using nested `<div>` tags by default:

        <div class="table">
          <div class="table-row">
            <div class="table-cell">
            </div>
            <div class="table-cell">
              <div class="table">
                <div class="table-row">
                  <div class="table-cell">title</div>
                  <div class="table-cell">foo</div>
                </div>
                <!-- ... -->

`class` attributes are used to specify the position of each `<div>` in
the rendered output.

### Using `<table>`, `<tr>` and `<td>` tags

Alternatively `<table/>`, `<tr>` and `<td>` tags can be used to render
the output:


        <table>
          <tbody>
            <tr>
              <td>
            <ul>
              <li>0</li>
            </ul>
              </td>
              <td>
            <table>
              <tbody>
                <tr>
                  <td>title</td>
                  <td>foo</td>
                </tr>
                        <!-- ... -->
    
However, this is clearly semantically incorrect use of HTML
table. Also note that the `<th>` tag is not used as it does not convey
any meaning in this context.

## Usage

Include:

        <script type="text/javascript" src="ultra.js"></script>

Use:

```javascript
var ultra = new UltraRenderer();
ultra.render({ "Hello": "World" });
```

## Configuration

* Specify whether node elements should be followed by a colon.

```javascript
ultra.addColon = true;
```

Leaf elements will never automatically be suffixed with a comma.

* Set the string to use instead of a colon (default: `': '`):

```javascript
ultra.colon = '->';
```

* Wrap, prefix and/or suffix node elements:

```javascript
ultra.nodePfx = '<pre>';
ultra.nodeSfx = '</pre>';
```

* Turn off special markup for children of array elements:

```javascript
ultra.noArrayMarkup = true;
```

The prefix and suffix of the wrapping markup can be set using
`arraElementPfx` and `arrayElementSfx` *(see below)*.

* Set the prefix/suffix for children of array elements:

```javascript
ultra.arrayElementPfx = '<b><i>';`
ultra.arrayElementSfx = '</i></b>';
```

* Set the `null` replacement (default: `'NIL'`).

```javascript
ultra.nullReplacement = '<b>No data available</p>';
```

This can conveniently be set to a link, for instance:

```javascript
ultra.nullReplacement = '<a href="http://www.google.com/">Google</a>';
```

*Note:* `nullReplacement` is not automatically turned into a link so
 that setting links manually using `<a href="...">...</a>` tags works
 correctly.

* Wrap, prefix and/or suffix leaf elements:

```javascript
ultra.leafPfx = '<i>';
ultra.leafSfx = '</i>';
```

* Wrap, prefix and/or suffix all leaf elements of type `'string'`:

```javascript
ultra.nodeStringPfx = '<i>';
ultra.nodeStringSfx = '</i>';
```

* Wrap, prefix and/or suffix all leaf elements of type `'number'`:

```javascript
ultra.nodeNumberPfx = '<i>';
ultra.nodeNumberSfx = '</i>';
```

* Wrap, prefix and/or suffix all leaf elements of type `'boolean'`:

```javascript
ultra.nodeBooleanPfx = '<i>';
ultra.nodeBooleanSfx = '</i>';
```

This could be used to render checkboxes. Usual events and DOM
manipulationcan would then allow to change the node text or to execute
callbacks on click events:

```javascript
ultra.nodeBooleanPfx = '<input type="checkbox" name="Checkbox" value="Nothing"/>';
```

* Advice the renderer to use `<table>`, `<tr>` and `<td>` tags instead of
`<div>` tags:

```javascript
var ultra = new UltraRenderer();
ultra.useTableTags = true;
```

## CSS

UltraJS assignes three different classes to the generated `<div>`
elements and sets their `display` property:

```css
.table {
    display: table;
}

.table-row {
    display: table-row;
}

.table-cell {
    display: table-cell;
}
```

To ensure the correct visual appearance,`display` must not be
altered. If `<table>`, `<tr>` and `<td>` tags are used, however, the
CSS rules have no effect and can be altered; the classes `table`,
`table-rwo` and `table-cell` can then be used freely.
