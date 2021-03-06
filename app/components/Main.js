// Include React
var React = require("react");
// Including the Link component from React Router to navigate within our application without full page reloads
var Link = require("react-router").Link;

var helpers = require("./utils/helpers");

var Main = React.createClass({

  // Here we set a generic state associated with the number of clicks
  // Note how we added in this history state variable
  getInitialState: function() {
    return { searchTerm: "", results: "", saved: [] };
  },

  // The moment the page renders get the History
  componentDidMount: function() {
    // Get the latest history.
    helpers.getSaved().then(function(response) {
      console.log(response);
      if (response !== this.state.saved) {
        console.log("Saved", response.data);
        this.setState({ saved: response.data });
      }
    }.bind(this));
  },

  // Here we render the function
  render: function() {

    return (

      <div className="container">
        <div className="jumbotron">
          <h2><strong>Search NYT</strong></h2>
          <p><em>Search NYT app and save articles</em></p>
          <hr />
          <p>
            <Link to="/Search"><button className="btn btn-primary btn-lg">Show Search</button></Link>
            <Link to="/Saved"><button className="btn btn-danger btn-lg">Show Saved</button></Link>
          </p>
        </div>

        <div className="row">

          {/* This code will dump the correct Child Component */}
          {this.props.children}

        </div>

      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Main;
