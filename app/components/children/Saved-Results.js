var React = require("react");
var helpers = require("../utils/helpers");

var SavedResult = React.createClass({

  handleSubmit: function() {
    console.log("Save button pressed")
    helpers.deleteSaved({ _id: this.props.articleInfo._id }).then(function(response) {
      console.log(this.props.articleInfo._id)
      console.log("Response: " + JSON.stringify(response, null, 2))
      this.props.removeSaved(this.props.articleInfo._id)
    }.bind(this))
  },

  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">{this.props.articleInfo.title}</div>
        <div className="panel-body">
          From: {this.props.articleInfo.date}
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <button type="submit" className="btn btn-default btn-sm">
              <span className="glyphicon glyphicon-remove" aria-hidden="true"></span> Delete
            </button>
          </div>
        </form>
      </div>
    )
  }
});

module.exports = SavedResult;
