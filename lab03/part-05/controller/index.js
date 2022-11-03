const data = require("../data/school.json");

module.exports.getAllStudents = (req, res) => {
  res.send(data);
};

module.exports.getStudentByIndex = (req, res) => {
  if(isNaN(req.params.index))
  res.end('not a valid index');
  const index=parseInt(req.params.index);
  if(index>data.length || index<0)
  res.end('not in range');
  
  res.send(data[index]);
};
