function chart(method) {
  let res = null;
  switch (method) {
    case "GET":
      res = [100, 90, 10, 50, 80, 16];
      break;
    default:
      res = null;
  }
  return res;
}

module.exports = chart;
