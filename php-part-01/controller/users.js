const User = require("../models/user");
const bcrypt = require("bcrypt");

const _sendResponse = (res, response) => {
  res.status(parseInt(response.status)).json(response.msg);
};

const _createDefaultResponseObject = (status, msg) => {
  return {
    status: status | 200,
    msg: msg | "success",
  };
};
const _validNewUserParams = (req) => {
  if (!req.body.name || !req.body.username || !req.body.password) return false;

  return true;
};
const _hashPassword = async (plaintextPassword) => {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = await bcrypt.hash(plaintextPassword, salt);
  // to check the hash
  //bcrypt.compareSync(myPlaintextPassword, hash);

  return hashedPassword;
};
const _createNewUserObject = async (req) => {
  const password = await _hashPassword(req.body.password);
  const user = {
    name: req.body.name,
    username: req.body.username,
    password: password,
  };

  return user;
};
module.exports.addOne = async (req, res) => {
  const response = _createDefaultResponseObject();
  if (!_validNewUserParams(req)) {
    response.status = process.env.INVALID_PARAMS_STATUS_CODE;
    response.msg = process.env.INVALID_PARAMS_MESSAGE;

    _sendResponse(res, response);
    return;
  }

  const user = await _createNewUserObject(req);
  User.create(user)
    .then((user) => {
      response.status = process.env.CREATE_STATUS_CODE;
      response.msg = user;
      console.log(response);
      _sendResponse(res, response);
    })
    .catch((err) => {
      response.status = process.env.INTERNAL_SERVER_ERORR_STATUS_CODE;
      response.msg = err;
      _sendResponse(res, response);
    });
};
