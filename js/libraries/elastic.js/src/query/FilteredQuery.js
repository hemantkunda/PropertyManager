  /**
    @class
    <p>Filter queries allow you to restrict the results returned by a query. There are
    several different types of filters that can be applied
    (see <a href="/jsdocs/ejs.filter.html">filter</a> module). A <code>filterQuery</code>
    takes a <code>Query</code> and a <code>Filter</code> object as arguments and constructs
    a new <code>Query</code> that is then used for the search.</p>

    @name ejs.FilteredQuery
    @ejs query
    @borrows ejs.QueryMixin.boost as boost
    @borrows ejs.QueryMixin._type as _type
    @borrows ejs.QueryMixin.toJSON as toJSON

    @desc
    <p>A query that applies a filter to the results of another query.</p>

    @param {Object} someQuery a valid <code>Query</code> object
    @param {Object} someFilter a valid <code>Filter</code> object.  This parameter
      is optional.

     */
  ejs.FilteredQuery = function (someQuery, someFilter) {

    if (!isQuery(someQuery)) {
      throw new TypeError('Argument must be a Query');
    }
    
    if (someFilter != null && !isFilter(someFilter)) {
      throw new TypeError('Argument must be a Filter');
    }
    
    var 
      _common = ejs.QueryMixin('filtered'),
      query = _common.toJSON();
    
    query.filtered.query = someQuery.toJSON();

    if (someFilter != null) {
      query.filtered.filter = someFilter.toJSON();
    }
    
    return extend(_common, {

      /**
             <p>Adds the query to apply a constant score to.</p>

             @member ejs.FilteredQuery
             @param {Object} oQuery A valid <code>Query</code> object
             @returns {Object} returns <code>this</code> so that calls can be chained.
             */
      query: function (oQuery) {
        if (oQuery == null) {
          return query.filtered.query;
        }
      
        if (!isQuery(oQuery)) {
          throw new TypeError('Argument must be a Query');
        }
        
        query.filtered.query = oQuery.toJSON();
        return this;
      },

      /**
             <p>Adds the filter to apply a constant score to.</p>

             @member ejs.FilteredQuery
             @param {Object} oFilter A valid <code>Filter</code> object
             @returns {Object} returns <code>this</code> so that calls can be chained.
             */
      filter: function (oFilter) {
        if (oFilter == null) {
          return query.filtered.filter;
        }
      
        if (!isFilter(oFilter)) {
          throw new TypeError('Argument must be a Filter');
        }
        
        query.filtered.filter = oFilter.toJSON();
        return this;
      },

      /**
            <p>Sets the filter strategy.</p>  

            <p>The strategy defines how the filter is applied during document collection.  
            Valid values are:</p>
            
            <dl>
                <dd><code>query_first</code> - advance query scorer first then filter</dd>
                <dd><code>random_access_random</code> - random access filter</dd>
                <dd><code>leap_frog</code> - query scorer and filter "leap-frog", query goes first</dd>
                <dd><code>leap_frog_filter_first</code> - same as <code>leap_frog</code>, but filter goes first</dd>
                <dd><code>random_access_N</code> - replace <code>N</code> with integer, same as random access 
                 except you can specify a custom threshold</dd>
            </dl>

            <p>This is an advanced setting, use with care.</p>
            
            @member ejs.FilteredQuery
            @param {String} strategy The strategy as a string.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      strategy: function (strategy) {
        if (strategy == null) {
          return query.filtered.strategy;
        }

        strategy = strategy.toLowerCase();
        if (strategy === 'query_first' || strategy === 'random_access_always' ||
          strategy === 'leap_frog' || strategy === 'leap_frog_filter_first' ||
          strategy.indexOf('random_access_') === 0) {
            
          query.filtered.strategy = strategy;
        }
        
        return this;
      },
      
      /**
            <p>Enables caching of the filter.</p>

            @member ejs.FilteredQuery
            @param {Boolean} trueFalse A boolean value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      cache: function (trueFalse) {
        if (trueFalse == null) {
          return query.filtered._cache;
        }

        query.filtered._cache = trueFalse;
        return this;
      },
      
      /**
            <p>Set the cache key.</p>

            @member ejs.FilteredQuery
            @param {String} k A string cache key.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      cacheKey: function (k) {
        if (k == null) {
          return query.filtered._cache_key;
        }

        query.filtered._cache_key = k;
        return this;
      }
      
    });
  };
