//     Backbone.Collection.search v0.2.1
//     by Joe Vu - joe.vu@homeslicesolutions.com
//     For all details and documentation:
//     https://github.com/homeslicesolutions/backbone-collection-search

;(function (root, factory) {

  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'backbone'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('underscore'), require('backbone'));
  } else {
    factory(root._, root.Backbone);
  }

}(this, function (_, Backbone) {

  // Extending out
  _.extend(Backbone.Collection.prototype, {  

    //@ Default Matcher - may be overwritten
    matcher: function(needle, haystack) {
      if (!needle || !haystack) return;
      needle = needle.toString().toLowerCase();
      haystack = haystack.toString().toLowerCase();
      return haystack.indexOf( needle ) >= 0;
    },

    //@ Search function
    search: function(keyword, attributes) {

      // If collection empty get out
      if (!this.models.length) return;

      // Filter
      var matcher = this.matcher;
      var results = this.filter(function( model ){  
        attributes = attributes && attributes.length ? attributes : _.keys( model.attributes );
        return !_.every( attributes, function( attribute ){
          return !matcher( keyword, model.get( attribute ) );
        });
      });

      // If keyword is blank, return all
      results = !results || !results.length ? this.models : results;

      // Instantiate new Collection
      var collection = new Backbone.Collection( results );
      collection.searching = { 
        keyword: keyword,
        attributes: attributes
      };
      collection.getSearchQuery = function() { 
        return this.searching;
      };

      // Cache the recently searched metadata
      this._searchResults = collection;

      // Async support with trigger
      var that = this;
      var t = setTimeout(function(){
        that.trigger('search', collection);
        clearTimeout(t);
      },10);

      // For use of returning un-async
      return collection;
    },

    //@ Get recent search query
    getSearchQuery: function() {
      return this.getSearchResults() && this.getSearchResults().getSearchQuery();
    },
    
    //@ Get recent search results
    getSearchResults: function() {
      return this._searchResults;
    },

    //_Cache
    _searchResults: null

  });

  return Backbone;

}));
