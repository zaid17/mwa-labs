const MongoClient = require("mongodb").MongoClient;
let _connection = null;
const open = function () {
  if (get() == null) {
    MongoClient.connect(process.env.DB_URL, function (err, client) {
      if (err) {
        console.log("DB connection failed");
        return;
      }

      _connection = client.db(process.env.DB_NAME);
      console.log("DB connection open");
      console.log(_connection);
    });
  } else return _connection;
};
const get = function () {
  console.log("inside get");
  console.log('from inside get',_connection);
  return _connection;
};
module.exports = {
  open: open,
  get: get,
};
