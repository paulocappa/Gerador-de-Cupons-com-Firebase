const firebase = require('firebase/app');
require('firebase/database');

const firebaseConfig = require('../config/database');

class Database {
  constructor() {
    this.initializeApp(firebaseConfig);

    this.database = firebase.database();
  }

  initializeApp(config) {
    firebase.initializeApp(config);
  }
}

module.exports = new Database().database;
