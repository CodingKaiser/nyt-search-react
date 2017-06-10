// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require("axios");

// Helper functions for making API Calls
var helper = {

  // This function serves our purpose of running the query to geolocate.
  runQuery: function(articleSearch) {

    console.log(articleSearch);

    // Figure out the geolocation
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    queryURL += '?' + $.param({
      'api-key': "a16ac3be92014038bbd3850b429f7b68",
      'q': articleSearch.query,
      'begin_date': articleSearch.begin_date,
      'end_date': articleSearch.end_date
    });
    return axios.get(queryURL).then(function(response) {
      // If get get a result, return that result's formatted address property
      console.log(response.data.response.docs)
      var result = []
      if (response.data.response.docs && response.data.response.docs[0]) {
        for (let article of response.data.response.docs) {
          let trimmedInfo = {}
          trimmedInfo["title"] = article.headline.main
          trimmedInfo["date"] = article.pub_date
          trimmedInfo["url"] = article.web_url
          trimmedInfo["_id"] = article._id
          result.push(trimmedInfo)
        }
      }
      // If we don't get any results, return an empty string
      return result;
    });
  },

  // This function hits our own server to retrieve the record of query results
  getSaved: function() {
    return axios.get("/api/article");
  },

  // This function posts new searches to our database.
  postSaved: function(saved) {
    return axios.post("/api/article", saved);
  },

  deleteSaved: function(toDel) {
    return axios.put("/api/article", toDel);
  }
};

// We export the API helper
module.exports = helper;
