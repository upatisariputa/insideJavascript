# 자바스크립트에서의 함수형 프로그래밍

- 자바스크립트에서도 함수형 프로그래밍이 가능한데 일급 객체로서의 함수, 클로저를 지원하기 때문

```javascript
// 암호화 예
var f1 = function(input) {
  var result;
  // 암호화 작업 수행
  result = 1;
  return result;
};

var f2 = function(input) {
  var result;
  // 암호화 작업 수행
  result = 2;
  return result;
};

var f3 = function(input) {
  var result;
  //암호화 작업 수행
  result = 3;
  return result;
};

var get_encrypted = function(func) {
  var str = "mina";

  return function() {
    return func.call(null, str);
  };
};
// get_encrypted()함수에서 반환하는 익명 함수가 클로저
// 이 클로저에서 접근하는 변수 str은 외부에서 접근할 수 없으므로 클로저로 함수형 프로그래밍을 구현 가능

var encrypted_value = get_encrypted(f1)();
console.log(encrypted_value);
var encrypted_value = get_encrypted(f2)();
console.log(encrypted_value);
var encrypted_value = get_encrypted(f3)();
console.log(encrypted_value);
```

## 배열의 각 원소 총합 구하기

- 배열의 각 원소 합을 구하는 코드(명령형)

```javascript
function sum(arr) {
  var len = arr.length;
  var i = 0,
    sum = 0;
  for (; i < len; i++) {
    sum += arr[i];
  }
  return sum;
}
var arr = [1, 2, 3, 4];
console.log(sum(arr)); // 10
```

- 배열의 각 원소의 곱을 구하는 코드(명령형)

```javascript
function multiply(arr) {
  var len = arr.length;
  var i = 0,
    result = 1;
  for (; i < len; i++) {
    result *= arr[i];
  }
  return result;
}
var arr = [1, 2, 3, 4];
console.log(multiply(arr)); // 24
```

- 함수형 프로그래밍 이용

```javascript
function reduce(func, arr, memo) {
  var len = arr.length,
    i = 0,
    accum = memo;

  for (; i < len; i++) {
    accum = func(accum, arr[i]);
  }
  return accum;
}
```

- reduce()함수는 함수와 배열을 인자로 받고 루프를 돌면서 함수를 실행, 함수를 실행시킨 후 얻은 결과값은 변수 accum에 계속해서 저장
- 루프가 끝나고 최종적으로 accum 값을 반환
- 사용자는 reduce()함수의 인자로 들어가는 함수를 직접 정의 가능

```javascript
var arr = [1, 2, 3, 4];

var sum = function(x, y) {
  return x + y;
};

var multiply = function(x, y) {
  return x * y;
};

console.log(reduce(sum, arr, 0));
console.log(reduce(multiply, arr, 1));
```

- 사용자가 연산을 해당하는 함수를 작성하여 reduce() 함수로 결과를 얻을수 있음

## 팩토리얼

```javascript
//명령형
function fact(num) {
  var val = 1;
  for (var i = 2; i <= num; i++) val = val * i;
  return val;
}
console.log(fact(100));
```

```javascript
//재귀
function fact(num) {
  if (num === 0) return 1;
  else return num * fact(num - 1);
}
console.log(fact(100));
```

```javascript
// 재귀 캐시에 저장
var fact = (function() {
  var cache = { "0": 1 };
  var func = function(n) {
    var result = 0;
    if (typeof cache[n] === "number") {
      result = cache[n];
    } else {
      result = cache[n] = n * func(n - 1);
    }
    return result;
  };
  return func;
})();
console.log(fact(10));
console.log(fact(20));
```

1. fact는 cache에 접근할 수 있는 클로저를 반환 받음
2. 클로저로 숨겨지는 cache에는 팩토리얼을 연산한 값을 저장하고 있음.
3. 연산을 수행하는 과정에서 캐시에 저장된 값이 있으면 곧바로 그 값을 반환

## 메모제이션 패턴

- memoize란 계산 결과를 저장해 놓아 이후 다시 계산할 필요 없이 사용할 수 있게 한다는 컴퓨팅 용어이다.
- 기본적으로 계산된 결과를 함수 프로퍼티값으로 담아 놓고 나중에 사용

```javascript
function Calculate(key, input, func) {
  Calculate.data = Calculate.data || {};
  if (!Calculate.data[key]) {
    var result;
    result = func(input);
    Calculate.data[key] = result;
  }
  return Calculate.data[key];
}

var result = Calculate(1, 5, function(input) {
  return input * input;
});
console.log(result);

result = Calculate(2, 5, function(input) {
  return (input * input) / 4;
});
console.log(result);

console.log(Calculate(1));
console.log(Calculate(2));
```

- Calculate()프로퍼티에 data프로퍼티를 만들어 객체를 할당
- 이곳에 사용자는 자신이 원하는 값을 원하는 키로 저장 가능

## 피보나치 수열

```javascript
var fibo = (function() {
  var cache = { "0": 0, "1": 1 };
  var result;
  var func = function(n) {
    if (typeof cache[n] === "number") {
      result = cache[n];
    } else {
      result = cache[n] = func(n - 1) + func(n - 2);
    }
    return result;
  };
  return func;
})();
console.log(fibo(10));
```

- 팩토리얼과 피보나치 수열을 계산하는 함수를 인자로 받는 함수

```javascript
var cacher = function(cache, func) {
  var result;
  var calculate = function(n) {
    if (typeof cache[n] === "number") {
      result = cache[n];
    } else {
      result = cache[n] = func(calculate, n);
    }
    return result;
  };
  return result;
};
```

- cacher함수는 사용자 정의 함수와 초기 cache값을 받아 연산을 수행

```javascript
var fact = cacher({ "0": 1 }, function(func, n) {
  return n * func(n - 1);
});
var fibo = cacher({ "0": 0, "1": 1 }, function(func, n) {
  return func(n - 1) + func(n - 2);
});
console.log(fact(10));
console.log(fibo(10));
```
