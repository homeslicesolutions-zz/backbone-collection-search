Backbone.Collection.search
==========================
A keyword search plugin for Backbone.Collections (read-only)

This plugin adds a "search" method to allow keyword search through the attribute values in the models of the collection.  The "matcher" method will be used to iterate through the values returning "true" if the attribute value contains the specified keyword. The search will then return a filtered collection of models (not manipulating the current collection, of course).

### How to use
Simply passthrough a query string to the search.  You may specify which attributes to search from.  Also, you can key in a delay (in milliseconds) to "delay" the returned search.
```
collection.search( [query string], [array of attributes OR null], [delay] );

collection.on('search', function( newCollection ) { ... });
```

