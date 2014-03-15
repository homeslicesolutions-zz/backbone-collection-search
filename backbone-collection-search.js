//     Backbone.Collection.search v0.1
//     by Joe Vu - joe.vu@homeslicesolutions.com
//     For all details and documentation:
//     https://github.com/homeslicesolutions/backbone-collection-search

!function(_, Backbone){

  // Extending out
  _.extend(Backbone.Collection.prototype, {  

    //@ Default Matcher - may be overwritten
    matcher: function(needle, haystack) {
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

      // Instantiate new Collection
      var collection = new Backbone.Collection( results );
      collection._searchQuery = keyword;
      collection.getSearchQuery = function() { 
        return this._searchQuery;
      }

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
    
    //@ Get recent search results
    getSearchResults: function() {
      return this._searchResults;
    },

    //_Cache
    _searchResults: null

  });

}(_, Backbone);