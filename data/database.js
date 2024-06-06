const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let database;

async function connectToDatabase() {
  const client = await MongoClient.connect(
    'mongodb+srv://CONNECtIt:CONNECtIt@cluster0.jzll7mx.mongodb.net/?retryWrites=true&w=majority'
  );
  database = client.db('auth-demo');
}

function getDb() {
  if (!database) {
    throw { message: 'You must connect first!' };
  }
  // console.log("Mongoose server up and running for users");
  return database;
}

module.exports = {
  connectToDatabase: connectToDatabase,
  getDb: getDb,
};
