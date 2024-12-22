import mongoose = require('mongoose');
import app from './app';
import config from './app/config';

async function main() {
  try {
    await mongoose.connect(config.database_uri as string);

    app.listen(config.port, () => {
      console.log(` app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
