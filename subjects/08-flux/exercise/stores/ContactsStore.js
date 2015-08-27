var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../AppDispatcher');
var ActionTypes = require('../Constants').ActionTypes;

var events = new EventEmitter();
var CHANGE_EVENT = 'CHANGE';

var state = {
  contacts: [],
  loaded: false
};

function setState(newState) {
  assign(state, newState);
  events.emit(CHANGE_EVENT);
}

var ContactsStore = {
  addChangeListener: function (fn) {
    events.addListener(CHANGE_EVENT, fn);
  },

  removeChangeListener: function (fn) {
    events.removeListener(CHANGE_EVENT, fn);
  },

  getState: function () {
    return state;
  }
};

ContactsStore.dispatchToken = AppDispatcher.register(function (payload) {
  var { action } = payload;

  if (action.type === ActionTypes.CONTACTS_LOADED) {
    setState({
      loaded: true,
      contacts: action.contacts
    });
  } else if (action.type === ActionTypes.CONTACT_DELETED) {
    setState({
      contacts: state.contacts.filter((c) => { return c.id != action.contact.id})
    });
  } else if (action.type === ActionTypes.ERROR_DELETING) {
    setState({
      error: {
        error: action.err,
        contact: action.contact
      }
    });
  }
});

module.exports = ContactsStore;
