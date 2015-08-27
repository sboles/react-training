////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Create a chat application using the utility methods we give you.
//
// Already done?
//
// - Create a filter that lets you filter messages in the chat by
//   sender and/or content
//
////////////////////////////////////////////////////////////////////////////////
var React = require('react');
var { login, sendMessage, subscribeToMessages } = require('./utils/ChatUtils');
var sortBy = require('sort-by');
require('./styles');

var Messages = React.createClass({
  renderMessages(messages) {
    return messages
      .sort(sortBy('timestamp'))
      .map((message) => {
        return (
          <li className="message" key={message._key}>
            <img className="message-avatar" src={message.avatar + '&s=40'} />
            <div className="message-username">{message.username}</div>
            <div className="message-content">{message.text}</div>
          </li>
        );
      });
  },
  render() {
    return (
      <div className="messages">
        <ol className="message-list">
          {this.renderMessages(this.props.messages)}
        </ol>
      </div>
    );
  }
});

var MessageBox = React.createClass({
  keyPressed(event) {
    if(event.key === 'Enter' && this.props.handleMessage) {
      this.props.handleMessage(event.target.value);
      event.target.value="";
    }
  },
  render() {
    return (
      <div className="new-message-form">
        <div className="new-message">
          <input type="text" onKeyDown={this.keyPressed} />
        </div>
      </div>
    );
  }
});

var ScrollBox = React.createClass({
  render() {
    return (
      <div ref="scrollbox" className="scrollbox">
        {this.props.children}
      </div>
    );
  }
});

var App = React.createClass({
  getInitialState() {
    return {
      auth: null,
      messages: null,
      room: 'general',
      subscription: null
    };
  },
  componentDidMount() {
    login((error, auth) => {
      this.setState({auth});
      var subscription = subscribeToMessages(this.state.room, (messages) => {
        this.setState({messages});
      });
      this.setState({subscription});
    });
  },
  componentDidUnmount() {
      this.state.subscription.dispose();
  },
  handleMessage(message) {
    sendMessage(this.state.room,
      this.state.auth.github.username,
      this.state.auth.github.profileImageURL,
      message
    );
  },
  render() {
    if(!this.state.messages) {
      return <div>Loading...</div>;
    }
    return (
      <div className="chat">
        <div className="room">
          <ScrollBox>
            <Messages messages={this.state.messages} />
          </ScrollBox>
          <MessageBox handleMessage={this.handleMessage}/>
        </div>
      </div>
    );
  }
});

React.render(<App />, document.getElementById('app'));

/*

Here's how to use the ChatUtils:

login((error, auth) => {
  // hopefully the error is `null` and you have a github
  // `auth` object
});

sendMessage(
  'general', // the channel to post a message to, please post to "general" at first
  'ryanflorence', // the github user name
  'https://avatars.githubusercontent.com/u/100200?v=3', // the github avatar
  'hello, this is a message' // the actual message
);

var subscription = subscribeToMessages('general', (messages) => {
  // here are your messages as an array, it will be called
  // every time the messages change
});
subscription.dispose(); // stop listening for changes

The world is your oyster!

*/
