var keyMirror = require('react/lib/keyMirror');

module.exports = {
  //API: 'http://localhost:3000',
  API: 'http://addressbook-api.herokuapp.com',

  ActionTypes: keyMirror({
    CONTACT_DELETED: null,
    CONTACTS_LOADED: null,
    DELETE_CONTACT: null,
    LOAD_CONTACTS: null
  }),

  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  })
};
