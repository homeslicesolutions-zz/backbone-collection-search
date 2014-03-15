//     Backbone.Collection.search-ajax v0.2
//     by Joe Vu - joe.vu@homeslicesolutions.com
//     For all details and documentation:
//     https://github.com/homeslicesolutions/backbone-collection-search

!function(_, Backbone){

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
        success: function( collection ){

          // Instantiate new Collection
          collection._searchQuery = keyword;
          collection.getSearchQuery = function() { 
            return this._searchQuery;
          }

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

}(_, Backbone);
