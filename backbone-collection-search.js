//     Backbone.Collection.search v0.1
//     by Joe Vu - joe.vu@homeslicesolutions.com
//     For all details and documentation:
//     https://github.com/homeslicesolutions/backbone-collection-search

!function(_, Backbone){

  // Extending out
  _.extend(Backbone.Collection.prototype, {  

    //@ Default Matcher - may be overwritten
    matcher: function(expected, actual) {
      actual = actual.toString().toLowerCase();
      return actual.indexOf( expected.toLowerCase() ) >= 0;
    },

    //@ Search function
    search: function(keyword, attributes, delay) {

      // If collection empty get out
      if (!this.models.length) return;

      // Variables
      var that = this,
          delay = delay || 10;

      // Clear out timeout
      this._searchTimeout = this._searchTimeout && clearTimeout(this._searchTimeout);

      // Run
      this._searchTimeout = setTimeout(function(){

        // Instantiate new Collection
        results = new Backbone.Collection();
        
        // Passthrough query
        results.searchQuery = keyword;

        // Iterate through collection models
        that.each( function( model ){
          
          // Use Set attributes OR search through all attributes
          attributes = attributes && attributes.length ? attributes : _.keys( model.attributes );

          // Iterate through each stated attributes
          _.every( attributes, function( attribute ){

            // Get the attribute value
            var attrValue = model.get(attribute);

            // Test if found in any attribute add, and on to the next
            if (attrValue && that.matcher( keyword, attrValue )) {
              results.add( model );
              return false;
            } else {
              return true;
            }

          })
        });

        // Cache the recently searched
        that._recentlySearched = results;

        // Trigger "search" and return with the new resulted collection
        that.trigger('search', results );

        // Exit
        that._searchTimeout = clearTimeout(that._searchTimeout);

      // Append Delay
      }, delay);
    },

    //_Cache
    _recentlySearched: null

  });

}(_, Backbone);
