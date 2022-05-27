const db = require('../config/connection');
const { User } = require('../models');
const Enterprise = require('../models/Enterprise');
const userSeeds = require('./userSeeds.json');

db.once('open', async () => {
  try {
    await User.deleteMany({});
    await Enterprise.deleteMany({})
    // await User.create(userSeeds);

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});

