const express = require("express");

const app = express();

app.get("/:fnumber", (req, res) => {
  const fnumber = req.params.fnumber;
  const lnumber = req.query.lnumber;

  return res.end(
    `<h1>the reuslt of dividing ${fnumber} by ${lnumber} is ${
      fnumber / lnumber
    }</h1>`
  );
});

app.listen(3000);
