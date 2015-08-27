var React = require('react');
var ContactsStore = require('../stores/ContactsStore');
var ViewActionCreators = require('../actions/ViewActionCreators');

var Error = React.createClass({
  render() {
    if(this.props.error) {
      return <div>You cannot delete {this.props.error.contact.first} {this.props.error.contact.last}</div>
    }
    return <div/>;
  }
});

var App = React.createClass({
  getInitialState: function () {
    return ContactsStore.getState();
  },

  handleStateChange() {
    this.setState(ContactsStore.getState());
  },

  componentWillMount: function() {
    ContactsStore.addChangeListener(this.handleStateChange);
  },

  componentWillUnmount: function() {
    ContactsStore.removeChangeListener(this.handleStateChange);
  },

  componentDidMount: function () {
    ViewActionCreators.loadContacts();
  },

  deleteContact(contact) {
    ViewActionCreators.deleteContact(contact);
  },

  renderContacts () {
    return this.state.contacts.map((contact) => {
      return (
        <li key={contact.first+contact.last}>
          <button onClick={this.deleteContact.bind(this, contact)}>delete</button>{contact.first} {contact.last}
        </li>
      );
    });
  },

  clearStorage() {
    ViewActionCreators.resetContacts();
  },

  render: function () {
    if (!this.state.loaded)
      return <div>Loading...</div>;

    return (
      <div>
        <Error error={this.state.error}/>
        <ul>{this.renderContacts()}</ul>
        <p>
          Clear local storage to reset contacts
          <button onClick={this.clearStorage}>clear</button>
        </p>
      </div>
    );
  }
});

module.exports = App;
