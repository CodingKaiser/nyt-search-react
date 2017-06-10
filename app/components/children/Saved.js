// Include React
var React = require("react");

var helpers = require("../utils/helpers");

var SavedResult = require("./Saved-Results")

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

  removeSaved: function(id) {
    let indexToRemove = -1
    for (let i = 0; i < this.state.saved.length; i++) {
      if (this.state.saved[i]._id === id) {
        indexToRemove = i
      }
    }
    this.state.saved.splice(indexToRemove, 1)
    this.setState({ saved: this.state.saved})
  },

  render: function() {
    return (
      <div className="container">
        <div className="col-lg-12">
          <div className="panel panel-danger">
            <div className="panel-heading">
              <h3 className="panel-title">Saved Articles</h3>
            </div>
            <div className="panel-body">
              {this.state.saved.map(function(res, i) {
                return (
                  <SavedResult removeSaved={this.removeSaved} articleInfo={res} key={i} />
                );
              }.bind(this))}
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Saved;
