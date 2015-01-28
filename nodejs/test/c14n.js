var awesome = function(test, arg1, arg2) {
  test.expect(1);
  test.equal(arg1, arg2);
  test.done();
}

module.exports = {
    "Test #1": function (test) {
     awesome(test, "1", "1");
  }
}
