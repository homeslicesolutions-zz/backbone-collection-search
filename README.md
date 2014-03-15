Backbone.Collection.search
==========================
A keyword search plugin for Backbone.Collections

This plugin adds a "search" method to allow keyword search through the model's attributes in the collection. This is a great plugin for implementation of typeahead widgets.

### How to use
```
collection.search( [query string] );

collection.on('search', function( results ) { ... });
```
### search
#### collection.search( [query string], [array of attributes] )
Search requires a query string and accepts an optional attributes parameter. All the attributes will be searched from each model unless you provide an array of attributes. When the results are ready, a trigger "search" will fire and a new collection of the models are returned.
```js
var Book = Backbone.Model;
var books = new Backbone.Collection();

books.add(new Book({ author: 'J. K. Rowling', related: 'Stephanie Meyer books', title: 'Harry Potter #1' }));
books.add(new Book({ author: 'P&B Pollack', related: 'Stephanie Meyer books', title: 'Who Is J. K. Rowling?' }));
books.add(new Book({ author: 'Stephanie Meyer', related: 'J. K. Rowling books', title: 'Twilight'}));

books.search('rowling', ['author','title']);

books.on('search', function( results ){ alert( results.pluck('title') ) });
// Will result: "Harry Potter #1,Who Is J. K. Rowling?"
```
```js
books.search('rowling');

books.on('search', function( results ){ alert( results.pluck('title') ) });
// Will result: "Harry Potter #1,Who Is J. K. Rowling?,Twilight"
```
### matcher
#### collection.matcher( needle, haystack )
`matcher` is used to test the query against the attribute value.  In the given default method, the search is doing a simple "indexOf" string search. It returns `true` if it finds a match. This can be customized to a more robust matcher if desired (i.e. RegExp).  In theory you may use different object types, but the provided method is dealing with strings.

#### collection.getSearchResults()
This will return the most recent queried results. The resulted collection also has a method `getSearchQuery()` to get the search query used to get that result.
```js
books.on('search', function(){ 
  var results = this.getSearchResults();
  
  alert( results.pluck('title') )
  // Will result: "Harry Potter #1,Who Is J. K. Rowling?"
  
  alert( results.getSearchQuery() )
  // Will result: "rowling"
});
```
#### collection.getSearchQuery()
This will return the most recent search query.  It will pull directly from `getSearchResults()`

## As a simple utility filter
Like the built in underscore methods, it returns the collection. Note: this won't work with the ajax version.
```js
var stephanieBooks = books.search('stephanie', ['author']);

alert(stephanieBooks.pluck('title'))
// Will result: "Twilight"
```

## Ajax version
### backbone-collection-search-ajax.js
If a front-end solution doesn't suffice, there is also an ajax support using the `fetch` function and ability to add parameters.  This is a starter piece to making that server-side search function.  The mark up on the front-end will be exactly the same, and it will similarly fire 'search' when the call is finished.  The appended parameters are `keyword` and `attributes[]`

```
GET http://somelibrary.com/api/books?keyword=rowling&attributes[]=author&attributes[]=title
```

## Non-destructive plugin
The plugin is non-destructive to all the existing behaviors.

## Prerequisites
 - Backbone v1.0
 - Underscore v1.4

## How to load

### Require.js AMD

```js
requirejs.config({
  paths: {
    'underscore': 'assets/js/underscore',
    'backbone': 'assets/js/backbone',
    'backbone-collection-search': 'assets/js/backbone-collection-search'
  },

  shim: {
    'backbone': {
      deps: ['underscore'],
      exports: 'Backbone'
    },
    'backbone-collection-search': {
      deps: ['underscore', 'backbone'],
      exports: 'Backbone'
    }
  }
});
```

### Static

```html
<script src="assets/js/underscore.js" />
<script src="assets/js/backbone.js" />
<script src="assets/js/backbone-collection-search.js" />
```

## Versions
#### v0.2
Code needed some love and refactoring so I had to make the changes
 - Removed `delay` because I thought it was unnessary.  Any delay (like for a typeahead widget) should be done in the View.
 - Added a way to return the collection without needing to wait for the trigger as a utility filter.
 - Added AJAX version as a starter piece to making a server-side search.

#### v0.1
 - First commit!





