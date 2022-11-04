
module.exports.games = (req, res) => {
    const dbConnection = require('../db').get();

 console.log(dbConnection);
 console.log('ok');
};
