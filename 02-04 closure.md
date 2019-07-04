# 클로져

## 클로져의 개념

```javascript
function outerFunc() {
  var x = 10;
  var innerFunc = function() {
    console.log(x);
  };
  return innerFunc;
}
var inner = outerFunc();
inner(); // 10
```

- innerFunc()의 [[scope]]는 outerFunc 변수 객체와 전역 객체를 가진다.
- outerFunc 실행 컨텍스트는 사라졌지만, outerFunc 변수 객체는 여전히 남아있고, innerFunc의 스코프 체인으로 참조되고 있다.
- 최종 반환되는 함수가 외부 함수의 지역변수에 접근, 이 지역변수에 접근하려면, 함수가 종료되어 외부 함수의 컨텍스트가 반환되더라도 변수 객체는 반환되는 내부 함수의 스코프 체인에 그대로 남아있어야만 접근할 수 있다.
- 이미 생명 주기가 끝난 외부함수의 변수를 참조하는 함수를 클로저라고 한다.
- 위의 예제에서는 outerFunc에서 선언된 x를 참조하는 innerFunc가 클로저가 된다.
- 클로저로 참조되는 외부 변수(outerFunc)의 x와 같은 변수를 자유 변수라고 ㅎ나다.

```javascript
function outerFunc(arg1, arg2) {
  var local = 8;
  function innerFunc(innerArg) {
    console.log((arg1 + arg2) / (innerArg + local));
  }
  return innerFunc;
}
var exam1 = outerFunc(2, 4);
exam1(2); // (2+4) / (8+2)
```

## 클로저의 활용

### 특정 함수에 사용자가 정의한 객체의 메서드 연결하기

```javascript
function HelloFunc(func) {
  this.greeting = "hello";
}

HelloFunc.prototype.call = function(func) {
  func ? func(this.greeting) : this.func(this.greeting);
};

var userFunc = function(greeting) {
  console.log(greeting);
};

var objHello = new HelloFunc();
objHello.func = userFunc;
objHello.call();
```

- 함수 HelloFunc는 greeting 변수가 있고, func 프로퍼티로 참조되는 함수를 call()함수로 호출한다.
- 사용자는 func 프로퍼티에 자신이 정의한 함수를 참조시켜 호출할 수 있다.
- HelloFunc.prototype.call()을 보면 자신의 지역 변수인 greeting만을 인자로 사용자가 정의한 함수에 넘긴다.
- 사용자는 userFunc()함수를 정의하여 objHello.func()에 참조시킨 뒤, HelloFunc()의 지역 변수인 greeting을 화면에 출력

```javascript
// 사용자가 원하는 인자를 추가하여 HelloFunc()를 이용하여 호출
function saySomething(obj, methodName, name) {
  return function(greeting) {
    return obj[methodName](greeting, name);
  };
}

function newObj(obj, name) {
  obj.func = saySomething(this, "who", name);
  return obj;
}

newObj.prototype.who = function(greeting, name) {
  console.log(greeting + " " + (name || "everyone"));
};
```

- newObj함수는 HelloFunc()의 객체를 자유롭게 활용하려고 정의한 함수

```javascript
var obj1 = new newObj(objHello, "zzoon");

obj.func = saySomething(this, "who", name);
return obj;
```

- 첫 번째 인자 obj의 func 프로퍼티에 saySomething() 함수에서 반환되는 함수를 참조하고, 반환한다.
- 결국 obj1은 인자로 넘겼던 objHello 객체에서 func 프로퍼티에 참조된 함수만 바뀐 객체가 됨

```javascript
obj1.call();
```

- 위 코드 실행시, newObj.prototype.who 함수가 호출되어 'hello zzoon'을 출력

```javascript
// saySomething()함수 안에서 실행되는 작업
function saySomething(obj, methodName, name) {
  return function(greeting) {
    return obj[method](greeting, name);
  };
}
```

1. 첫 번째 인자 : newObj객체 - obj1
2. 두 번째 인자 : 사용자가 정의한 메서드 이름 - 'who'
3. 세 번째 인자 : 사용자가 원하는 사람 이름 값 - 'zzoon'
4. 반환 : 사용자가 정의한 newObj.prototype.who() 함수를 반환하는 helloFunc()의 func함수

- 이렇게 반환 되는 함수가 HelloFunc가 원하는 function(greeting){} 형식의 함수가 되는데, 이것이 HelloFunc 객체의 func로 참조된다.
  obj1.call()로 실행되는 것은 실질적으로 newObj.prototype.who()가 된다.

- 이와 같은 방식으로 사용자는 자신의 객체 메서드인 who 함수를 HelloFunc에 연결시킬 수 있다.
  여기서 클로저는 saySomething()에서 반환되는 function(greeting){}이 되고, 이 클로저는 자유 변수 obj, methodName, name을 참조한다.

### 함수의 캡슐화

- I am name. I live in city. I'am age years old. 구현

```javascript
var buffAr = ["I am ", "", ". I live in ", "", ". I'am ", "", " years old."];

function getCompletedStr(name, city, age) {
  buffAr[1] = name;
  buffAr[3] = city;
  buffAr[5] = age;
  return buffAr.join("");
}

var str = getComepletedStr("zzoon", "seoul", 16);
console.log(str);
```

- buffAr이 전역 변수로 외부에 노출

```javascript
// 클로저를 활용하여 buffAr을 추가적인 스코프에 넣음
var getComepletedStr = (function() {
  var buffAr = ["I am ", "", ". I live in ", "", ". I'am ", "", " years old."];

  return function(name, city, age) {
    buffAr[1] = name;
    buffAr[3] = city;
    buffAr[5] = age;
    return buffAr.join("");
  };
})();
var str = getCompletedStr("zzoon", "seoul", 16);
console.log(str);
```

- getCompletedStr에 익명의 함수를 즉시 실행 함수를 할당
- 이 반환되는 함수가 클로저가 되고, 이 클로저는 자유 변수 buffAr을 스코프 체인에서 참조 가능

### setTimeout()에 지정되는 함수의 사용자 정의

```javascript
function callLater(obj, a, b) {
  return function() {
    obj["sum"] = a + b;
    console.log(obj["sum"]);
  };
}
var sumObj = {
  sum: 0
};

var func = callLater(sumObj, 1, 2);
setTimeout(func, 500);
```

- callLater를 setTimeout 함수로 호출하려면 변수 func에 함수를 반환받아 setTimeout() 함수의 첫 번째 인자로 넣어주면 된다.

## 클로저를 활용할 때 주의사항

### 클로저의 프로퍼티값이 쓰기 가능하므로 그 값이 여러 번 호출로 항상 변할 수 있음에 유의

```javascript
function outerFunc(argNum) {
  var num = argNum;
  return function(x) {
    num += x;
    console.log("num: " + num);
  };
}
var exam = outerFunc(40);
exam(5); // num: 45
exam(-10); // num: 35
```

- exam값을 호출 할 때마다 자유 변수 num의 값은 계속해서 변한다.

### 하나의 클로저가 여러 함수 객체의 스코프 체인에 들어가 있는 경우도 있다.

```javascript
function func() {
  var x = 1;
  return {
    func1: function() {
      console.log(++x);
    },
    func2: function() {
      console.log(-x);
    }
  };
}

var exam = func();
exam.func1();
exam.func2();
```

- 반환되는 객체에는 두 개의 함수가 정의되어 있는데, 두 함수 모두 자유 변수 x를 참조, 각각의 함수가 호출될 때마다 x값이 변화하므로 유의

### 루프 안에서 클로저 활용시 주의

```javascript
function countSeconds(howMany) {
  for (var i = 0; i <= howMany; i++) {
    setTimeout(function() {
      console.log(i);
    }, i * 1000);
  }
}
coutSeconds(3);
```

- 1,2,3을 1초 간격으로 출력해야 하지만 결과는 4가 연속으로 3번 1초 간격으로 출력
- setTimeout 함수의 인자로 들어가는 함수는 자유 변수 i를 참조한다. 하지만 이 함수가 실행되는 시점은 countSecondes()함수의 실행이 종료된 이후이고, i 값은 이미 4이다.

```javascript
function countSeconds(howMany) {
  for (var i = 0; i <= howMany; i++) {
    (function(currentI) {
      setTimeout(function() {
        console.log(currentI);
      }, currentI * 1000);
    })(i);
  }
}
```

- 즉시 실행 함수를 실행시켜 루프 i 값을 currentI에 복사해서 setTimeout()에 들어갈 함수에서 사용
