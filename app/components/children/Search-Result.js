var React = require("react");
var helpers = require("../utils/helpers");
var Link = require("react-router").Link;


var SearchResult = React.createClass({

  handleSubmit: function() {
    console.log("Save button pressed")
    helpers.postSaved(this.props.articleInfo).then(function(response) {
      console.log("Response")
      console.log(this.props)
      this.props.removeResult(this.props.articleInfo._id)
    }.bind(this))
  },

  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading"><a target="_blank" href={this.props.articleInfo.url}>{this.props.articleInfo.title}</a></div>
        <div className="panel-body">
          From: {this.props.articleInfo.date}
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <button type="submit" className="btn btn-default btn-sm">
              <span className="glyphicon glyphicon-star" aria-hidden="true"></span> Save
            </button>
          </div>
        </form>
      </div>
    )
  }
});

module.exports = SearchResult;
