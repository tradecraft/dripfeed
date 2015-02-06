/** @jsx React.DOM */

var React = require('react');

module.exports = NotificationBar = React.createClass({
  render: function () {
    var count = this.props.count;

    return (
      <div className={"notification-bar" + (count > 0 ? ' active' : '')}>
        <p className={"title"}>dripfeed</p>
        <p className={"counter"}>You have {count} new tweets!</p>
        <p className={"refresh"}>
          <a href="#top" onClick={this.props.onShowNewTweets}>
            <i className={"fa fa-refresh"}></i>
          </a>
        </p>
      </div>
    )
  }
});
