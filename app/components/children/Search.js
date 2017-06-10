// Include React
var React = require("react");
// Including the Link component from React Router to navigate within our application without full page reloads
var Link = require("react-router").Link;

var SearchResult = require("./Search-Result")

var helpers = require("../utils/helpers");

var Search = React.createClass({

  getInitialState: function() {
    return { query: "", begin_date: "", end_date: "", results:[] };
  },

  // This function will respond to the user input
  handleQueryChange: function(event) {
    console.log("Query: " + event.target.value)
    this.setState({ query: event.target.value });

  },

  // This function will respond to the user input
  handleBeginDateChange: function(event) {
    console.log("Begin Date" + event.target.value)

    this.setState({ begin_date: event.target.value });

  },

  // This function will respond to the user input
  handleEndDateChange: function(event) {
    console.log("End Date: " + event.target.value)

    this.setState({ end_date: event.target.value });

  },

  removeResult: function(id) {
    let indexToRemove = -1
    for (let i = 0; i < this.state.results.length; i++) {
      if (this.state.results[i]._id === id) {
        indexToRemove = i
      }
    }
    this.state.results.splice(indexToRemove, 1)
    this.setState({ results: this.state.results})
  },

  // When a user submits...
  handleSubmit: function(event) {
    // prevent the HTML from trying to submit a form if the user hits "Enter" instead of
    // clicking the button
    event.preventDefault();

    let searchQuery = {
      query: this.state.query,
      begin_date: this.state.begin_date,
      end_date: this.state.end_date
    }

    helpers.runQuery(searchQuery).then(function(response) {
      console.log(response)
      this.setState({ query: "", begin_date: "", end_date: "", results: response });
    }.bind(this))

    // Set the parent to have the search term
  },

  render: function() {
    return (
      <div className="container">
        <div className="col-lg-12">
          <div className="panel panel-primary">
            <div className="panel-heading">
              <h3 className="panel-title">Search</h3>
            </div>
            <div className="panel-body">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <h4 className="">
                    <strong>Location</strong>
                  </h4>

                  {/*
                    Note how each of the form elements has an id that matches the state.
                    This is not necessary but it is convenient.
                    Also note how each has an onChange event associated with our handleChange event.
                  */}
                  <p>Query:</p>
                  <input
                    value={this.state.term}
                    type="text"
                    className="form-control text-center"
                    id="query"
                    onChange={this.handleQueryChange}
                    required
                  />
                  <p>Begin Date (YYYYMMDD):</p>
                  <input
                    value={this.state.begin_date}
                    type="text"
                    className="form-control text-center"
                    id="begin_date"
                    pattern="^(?:(?:(?:(?:(?:[13579][26]|[2468][048])00)|(?:[0-9]{2}(?:(?:[13579][26])|(?:[2468][048]|0[48]))))(?:(?:(?:09|04|06|11)(?:0[1-9]|1[0-9]|2[0-9]|30))|(?:(?:01|03|05|07|08|10|12)(?:0[1-9]|1[0-9]|2[0-9]|3[01]))|(?:02(?:0[1-9]|1[0-9]|2[0-9]))))|(?:[0-9]{4}(?:(?:(?:09|04|06|11)(?:0[1-9]|1[0-9]|2[0-9]|30))|(?:(?:01|03|05|07|08|10|12)(?:0[1-9]|1[0-9]|2[0-9]|3[01]))|(?:02(?:[01][0-9]|2[0-8])))))$"
                    onChange={this.handleBeginDateChange}
                    required
                  />
                  <p>End Date (YYYYMMDD):</p>
                  <input
                    value={this.state.end_date}
                    type="text"
                    className="form-control text-center"
                    id="end_date"
                    pattern="^(?:(?:(?:(?:(?:[13579][26]|[2468][048])00)|(?:[0-9]{2}(?:(?:[13579][26])|(?:[2468][048]|0[48]))))(?:(?:(?:09|04|06|11)(?:0[1-9]|1[0-9]|2[0-9]|30))|(?:(?:01|03|05|07|08|10|12)(?:0[1-9]|1[0-9]|2[0-9]|3[01]))|(?:02(?:0[1-9]|1[0-9]|2[0-9]))))|(?:[0-9]{4}(?:(?:(?:09|04|06|11)(?:0[1-9]|1[0-9]|2[0-9]|30))|(?:(?:01|03|05|07|08|10|12)(?:0[1-9]|1[0-9]|2[0-9]|3[01]))|(?:02(?:[01][0-9]|2[0-8])))))$"
                    onChange={this.handleEndDateChange}
                    required
                  />
                  <br />
                  <button
                    className="btn btn-primary"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </form>
              {this.state.results.map(function(res, i) {
                return (
                  <SearchResult removeResult={this.removeResult} articleInfo={res} key={i} />
                );
              }.bind(this))}

            </div>

          </div>
        </div>
      </div>
    );
  }
});

module.exports = Search;
