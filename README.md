Backbone.Collection.search
==========================
A keyword search plugin for Backbone.Collections

This plugin adds an asynchromous "search" method to allow keyword search through the model's attributes in the collection. 

### How to use
```
collection.search( [query string] );

collection.on('search', function( results ) { ... });
```
### search
#### collection.search( [query string], [array of attributes], [milliseconds] )
Search requires a query string and accepts two optional parameters. In one optional parameter, you can provide an array of attributes that you want to search from.  Without the option, all the attributes in each model will be searched. In the last optional parameter, you can key in a delay (in milliseconds) to "delay" the returned search. Every invocation of the search will cancel the last invoked.  When the results are ready, a trigger "search" will fire and a new collection of the models are returned.
```js
var Book = Backbone.Model;
var books = new Backbone.Collection();

books.add(new Book({ author: 'J. K. Rowling', related: 'Stephanie Meyer books', title: 'Harry Potter #1' }));
books.add(new Book({ author: 'P&B Pollack', related: 'Stephanie Meyer books', title: 'Who Is J. K. Rowling?' }));
books.add(new Book({ author: 'Stephenie Meyer', related: 'J. K. Rowling books', title: 'Twilight'}));

books.search('rowling', ['author','title']);

books.on('search', function( results ){ alert( results.pluck('title') ) });
// Will result: Harry Potter #1,Who Is J. K. Rowling?
```
```js
books.search('rowling');

books.on('search', function( results ){ alert( results.pluck('title') ) });
// Will result: Harry Potter #1,Who Is J. K. Rowling?,Twilight
```
### matcher
#### collection.matcher( needle, haystack )
`matcher` is used to test the query against the attribute value.  In the given default method, the search is doing a simple "indexOf" string search.  It returns `true` if it finds a match. This can be customized to a more robust matcher if desired (i.e. RegExp);  

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





