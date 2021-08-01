const mongoose = require('mongoose');
require('dotenv').config();

mongoose.Promise = global.Promise;

class DbHandler {
  init() {
    mongoose.set('useCreateIndex', true);
    mongoose.connect(
      this.buildUrl(),
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      (err) => {
        if (err) {
          console.error(`MongoDB connection error: ${err}`);
          process.exit(1);
        }else {
          console.log('Successfully connected to MongoDB');
        }
      });
  }

  buildUrl() {
    const { MONGODB_ENDPOINT, DATABASE_NAME, DATABASE_CONNECTION_URL_SUFFIX } = process.env;
    return `${this.buildPrefix()}://${this.buildUrlAuthentication()}${MONGODB_ENDPOINT}/${DATABASE_NAME}${DATABASE_CONNECTION_URL_SUFFIX}`;
  }

  buildUrlAuthentication() {
    const { DATABASE_USER, DATABASE_PASSWORD } = process.env;

    if (typeof DATABASE_USER === 'undefined' || DATABASE_USER === '' ||
    typeof DATABASE_PASSWORD === 'undefined' || DATABASE_PASSWORD === '') {
      return '';
    }

    return `${DATABASE_USER}:${DATABASE_PASSWORD}@`;
  }

  buildPrefix() {
    const { DATABASE_SRV_RECORD_ENABLE } = process.env;

    let prefix = 'mongodb';

    if (DATABASE_SRV_RECORD_ENABLE === 'true') {
      prefix += '+srv';
    }

    return prefix;
  }
}

new DbHandler().init();

module.exports = {
    Config: require('./config.model')
};