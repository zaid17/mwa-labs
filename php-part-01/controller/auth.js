const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { model } = require("mongoose");
const _sendResponse = (res, response) => {
  res.status(parseInt(response.status)).json({
    msg: response.msg,
    token: response.token,
    user_name: response.user_name,
  });
};

const _createDefaultResponseObject = (status, msg) => {
  return {
    status: status | 200,
    msg: msg,
    token: "",
    user_name: "",
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
  if (!isValid) throw process.env.NOT_VALID_USER_ERORR_MESSAGE;
  return true;
};
const _setUserName = (response, user) => {
  response.user_name = user.name;
  return user;
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
    return;
  }
  const username = req.body.username;
  User.findOne({ username: username })
    .then((user) => _setUserName(response, user))
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

module.exports.authenticateToken = (req, res, next) => {
  const response = _createDefaultResponseObject(403);
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.TOEKN_PRIVATE_KEY);
    next();
  } catch (err) {
    _sendResponse(res, response);
  }
};
