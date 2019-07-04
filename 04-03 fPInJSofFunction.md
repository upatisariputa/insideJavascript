## 자바스크립트에서의 함수형 프로그래밍을 활용한 주요 함수

## 커링

- 특정 함수에서 정의된 인자의 일부를 넣어 고정시키고, 나머지를 인자로 받는 새로운 함수를 만드는 것

```javascript
function calculate(a, b, c) {
  return a * b + c;
}

function curry(func) {
  var args = Array.prototype.slice.call(arguments, 1);

  return function() {
    return func.apply(null, args.concat(Array.prototype.slice.call(arguments)));
  };
}

var new_func1 = curry(calculate, 1);
console.log(new_func1(2, 3)); // 5
var new_func2 = curry(calculate, 1, 3);
console.log(new_func2(3)); // 6
```

- calculate()함수는 인자 세 개를 맏아 연산을 수행하고 결과값을 반환
- curry() 함수로 첫 번째 인자를 1로 고정시킨 새로운 함수 new_func1()과 첫 번째, 두번째 인자를 1과 3으로 고정시킨 new_func2() 함수를 새롭게 만들수 있음
- curry()는 curry()함수로 넘어온 인자를 args에 담아 놓고, 새로운 함수 호출로 넘어온 인자와 합쳐서 함수를 적용

- Function.prototype에 커링함수를 정의하여 사용하기

```javascript
Function.prototype.curry = function() {
  var fn = this,
    args = Array.prototype.slice.call(arguments);
  return function() {
    return fn.apply(this, args.concat(Array.prototype.slice.call(arguments)));
  };
};
```

- calculate() 함수의 첫 번째 인자와 세 번째 인자를 고정할 때

```javascript
function calculate(a, b, c) {
  return a * b + c;
}

function curry2(func) {
  var args = Array.prototype.slice.call(arguments, 1);

  return function() {
    var arg_idx = 0;
    for (var i = 0; i < args.length && arg_idx < arguments.length; i++)
      if (args[i] === undefined) {
        args[i] = arguments[arg_idx++];
        return func.apply(null, args);
      }
  };
}
var new_func = curry2(calculate, 1, undefined, 4);
console.log(new_func(3)); // 7
```

- curry2 를 호출 할 시에는 calculate()함수가 원하는 인자를 전부 넣어야 함
- 그 중에서 고정시키지 않을 인자를 undefined로 넘기면 됨
- curry2()에서는 curry2()를 호출할 때 넘어온 인자로 루프를 돌면서 undefined인 요소를 새로운 함수를 호출할 때 넘어온 인자로 대체
- 함수를 부분적으로 적용하여 새로운 함수를 반환받는 방식을 함수의 부분적용이라 함(curry() 메서드)

## bind

```javascript
Function.prototype.bind = function(thisArg) {
  var fn = this;
  slice = Array.prototype.slice;
  args = slice.call(arguments, 1);
  return function() {
    return fn.apply(thisArg, args.concat(slice.call(arguments)));
  };
};
```

- 사용자가 고정시키고자 하는 인자를 bind() 함수를 호출할 때 인자로 넘겨주고 반환받은 함수를 호출하면서 나머지 가변 인자를 넣음
- curry()와 차이점은 함수를 호출할 때 this에 바인딩 시킬 객체를 사용자가 넣을 수 있음

```javascript
var print_all = function(arg) {
  for (var i in this) console.log(i + " : " + this[i]);
  for (var i in arguments) console.log(i + " : " + arguments[i]);
};

var myobj = { name: "mina" };

var myfunc = print_all.bind(myobj);
myfunc(); // name : 'mina'

var myfunc1 = print_all.bind(myobj, "momo", "others");
myfunc1("insidejs");

/*
'0 : momo'
'1 : others'
'2 : insidejs'
 */
```

- myfunc()함수는 myobj 객체를 this에 바인딩시켜 print_all() 함수를 실행하는 새로운 함수이다.
- myfunc1()을 실행하면 bind() 함수에 모두 넘겨짐
- bind()함수는 특정 함수에 원하는 객체를 바인딩시켜 새로운 함수를 사용할 때 사용

## 래퍼

- 특정 함수를 자신의 함수로 덮어쓰는 것
- 원래 함수 기능을 잃어버리지 않은 상태로 자신의 로직을 수행하여야 함

```javascript
function wrap(object, method, wrapper){
    var fn = object[method]
    return object[method] =
}
```
