Backbone.Collection.search
==========================
A keyword search plugin for Backbone.Collections (read-only)

This plugin adds an async "search" method to allow keyword search through the attribute values in the models of the collection. 

### How to use
```
collection.search( [query string], [array of attributes OR null], [delay OR null] );

collection.on('search', function( results ) { ... });
```
#### collection.search( [query string], [array of attributes OR null], [delay OR null] )
Search requires the the query string and has two optional parameters. One optional parameter you can provide an array of attributes you would like to search from.  Without the option, all the attributes in each model will be searched. In the last optional parameter, you can key in a delay (in milliseconds) to "delay" the returned search (this may be useful in older browsers for models with a lot of attributes). When the results are ready, the collection will trigger "search" and returning a new Backbone.Collection of the models that made it through the filter.
```js
var Book = Backbone.Model;
var books = new Backbone.Collection();

books.add(new Book({ author: 'J. K. Rowling', age: 'young-adults', title: 'Harry Potter #1' }));
books.add(new Book({ author: 'Pamela/ Belviso Pollack', age: 'young-adults', title: 'Who Is J. K. Rowling?' }));
books.add(new Book({ author: 'Stephenie Meyer', age: 'teens', title: 'Twilight'}));

books.search('rowling', ['author','title']);

books.on('search', function( results ){ alert( results.pluck('title') ) });
// Will result: Harry Potter #1,Who Is J. K. Rowling?
```

#### collection.matcher( needle, haystack )
"matcher" is used to test the query against the attribute value.  In the given default method, the search is doing a simple indexOf keyword search.  It returns true if it finds a match. This can be customized to a more robust matcher if desired (i.e. RegExp);  

#### collection.getSearchResults()
This will return the most recent queried results.  Again, this is in a form of a Backbone.Collection.  That resulted collection also has a method "getSearchQuery()" to get the search query used to get that result.
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




