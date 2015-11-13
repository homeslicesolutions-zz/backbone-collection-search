//     Backbone.Collection.search-ajax v0.2.1
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

    //@ Search for AJAX version
    search: function(keyword, attributes) {
      
      // Closure
      var that = this;

      // Get new data
      this.fetch({
        parse: false,
        data: {
          keyword: keyword,
          attributes: attributes
        },
        success: function( results ){

          // Instantiate new Collection
          var collection = new Backbone.Collection( results.models );
          collection.searching = { 
            keyword: keyword,
            attributes: attributes
          };
          collection.getSearchQuery = function() { 
            return this._searchQuery;
          };

          // Cache the recently searched metadata
          that._searchResults = collection;

          // Fire search event with new collection
          that.trigger('search', collection );
        }
      });
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
