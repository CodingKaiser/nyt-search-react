// Include React
var React = require("react");

var helpers = require("../utils/helpers");


var Saved = React.createClass({

  getInitialState: function() {
    return { saved: [] };
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

  render: function() {
    return (
      <div className="container">
        <div className="col-lg-12">
          <div className="panel panel-danger">
            <div className="panel-heading">
              <h3 className="panel-title">Child #2</h3>
            </div>
            <div className="panel-body">
              {this.state.saved.map(function(save, i) {
                return (
                  <p key={i}>{save.title} - {save.date}</p>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Saved;
