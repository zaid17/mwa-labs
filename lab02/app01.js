const fibonacci = function (number) {
  if (number < 0) return fibonacci(-number);
  if (number <= 2) {
    return 1;
  } else {
    return fibonacci(number - 1) + fibonacci(number - 2);
  }
};
console.log("start");
setTimeout(() => {
  console.log(fibonacci(33));
}, 0);
setTimeout(() => {
  console.log(fibonacci(-30));
}, 0);
console.log("end");

// we can also create a new process, but it's not a good idea
/*
const newProcess= child_process.spawn("node",
["fibonacci.js"], {stdio : "inherit"});

*/
