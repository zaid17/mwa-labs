const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const _sendResponse = (res, response) => {
  res
    .status(parseInt(response.status))
    .json({ msg: response.msg, token: response.token });
};

const _createDefaultResponseObject = (status, msg) => {
  return {
    status: status | 200,
    msg: msg,
    token: "",
  };
};
const _validAuthParams = (req) => {
  if (!req.body.username || !req.body.password) return false;

  return true;
};
const _comaprePasswords = (plaintextPassword, hashedPassword) => {
  return bcrypt
    .compare(plaintextPassword, hashedPassword)
    .then((isValid) => {
      console.log(isValid);
      return isValid;
    })
    .catch((err) => false);
};

const _validateUser = (isValid) => {
  if (!isValid) throw "not a valid user";
  return true;
};

const _generateUserToken = (username) => {
  const token = jwt.sign(
    {
      data: username,
    },
    process.env.TOEKN_PRIVATE_KEY,
    { expiresIn: "1h" }
  );

  return token;
};
module.exports.authenticateUser = async (req, res) => {
  const response = _createDefaultResponseObject(200, true);
  if (!_validAuthParams(req)) {
    response.status = process.env.INVALID_PARAMS_STATUS_CODE;
    response.msg = process.env.INVALID_PARAMS_MESSAGE;

    _sendResponse(res, response);
  }

  const username = req.body.username;
  
  User.findOne({ username: username })
    .then((user) => _comaprePasswords(req.body.password, user.password))
    .then((isValid) => _validateUser(isValid))
    .then(() => _generateUserToken(username))
    .then((token) => {
      response.token = token;
    })
    .then(() => _sendResponse(res, response))
    .catch((err) => {
      response.status = process.env.INVALID_PARAMS_STATUS_CODE;
      response.msg = false;
      _sendResponse(res, response);
    });
};
