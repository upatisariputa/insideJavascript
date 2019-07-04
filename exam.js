var fibo = (function() {
  var cache = { "0": 0, "1": 1 };
  var fibo = function(n) {
    if (typeof cache[n] === "number") {
      result = cache[n];
    } else {
      result = cache[n] = fibo(n - 1) + fibo(n - 2);
    }
    return result;
  };
  return fibo;
})();
console.log(fibo(10));
