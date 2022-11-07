const mongoose = require("mongoose");

//todo : complete these methods to make it eaiser on the long run.

const isValidObjectId = (id, res) => {
  if (!mongoose.isValidObjectId(id)) {
    res.status(400).send("invalid object id");
    return;
  }

  return true;
};

const notFoundHandler = (msg, res) => res.status(404).json({ msg: msg });

const errHandler = (err, msg, res) => {
  console.log(msg, err);
  res.status(500).json({ msg: msg });
};

const requiredInputFields = () => {};
