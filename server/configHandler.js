const db = require('./dbHandler');
const Config = db.Config;

const {
  DEFAULT_CONFIG
} = require('./default-config');

function createConfig(shop) {
  return new Promise((resolve, reject) => {
    Config.exists({
      shop
    }, (err, exists) => {
      if (err) reject(err);

      if (exists) {
        console.log(`${shop} config already exists.`);
        resolve(false);
        return;
      }

      console.log(`creating new config for ${shop}`);

      const newConfig = new Config({
        shop,
        config: DEFAULT_CONFIG,
        created: new Date(),
      });

      console.log(`new config for ${shop} created`);

      newConfig.save().then(() => resolve(true));
    });
  });
}

function get(shop) {
  return Config.findOne({
    shop
  }).lean();
}

function getAll() {
  return Config.find().lean();
};

function updateConfig(shop, config) {
  return new Promise((resolve, reject) => {
    Config.findOneAndUpdate({
      shop
    }, {
      config
    }).lean().then(async (_) => {
      const config = await get(shop);

      resolve(config);
    }).catch((err) => {
      reject(err);
    });
  });
}

module.exports = {
  createConfig,
  get,
  getAll,
  updateConfig,
}