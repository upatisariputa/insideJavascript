# 스코프 체인

- 자바스크립트에서는 오직 함수만이 유효범위의 한 단위가 된다.
  이 유효 범위를 나타내는 스코프가 [[scope]]프로퍼티로 각 함수 객체 내에서 연결 리스트 형식으로 관리 되는데, 이를 스코프 체인이라 한다.

  **각각의 함수는 [[scope]]프로퍼티로 자신이 생성된 실행 컨텍스트의 스코프 체인을 참조한다.**
  함수가 실행되는 순간 실행 컨텍스트가 만들어지고, **이 실행 컨텍스트는 실행된 함수의 [[scope]]프로퍼티를 기반으로 새로운 스코프 체인을 만든다.**

## 전역 실행 컨텍스트의 스코프 체인

```javascript
var var1 = 1;
var var2 = 2;
console.log(var1);
console.log(var2);
```

- 위의 코드는 전역 코드이다. 함수가 선언되지 않아 함수 호출이 없고, 실행 가능한 코드들만 나열되어 있다.
  위의 코드를 실행하면, 먼저 전역 실행 컨텍스트가 생성되고, 변수 객체가 만들어 진다.
  이 변수 객체의 스코프체인은 전역 실행 컨텍스트 단 하나만 실행 되고 있어 참조할 상위 컨텍스트가 없다.
  **자신이 최상위에 위치하는 변수 객체**이다. 이 변수 객체의 스코프 체인은 자기 자신만을 가진다.
  **변수 객체의 [[scope]]는 변수 객체 자신을 가리킨다.**
  그 후 var1, var2 변수들이 생성되고 변수 객체에 의해 참조된다. 실행 컨텍스트 생성 과정에 따라 변수 객체가 곧 전역 객체가 된다.

## 함수를 호출한 경우 생성되는 실행 컨텍스트의 스코프 체인

```javascript
var var1 = 1;
var var2 = 2;
function func() {
  var var1 = 10;
  var var2 = 20;
  console.log(var1); // 10
  console.log(var2); // 20
}
func();
console.log(var1); // 1
console.log(var2); // 2
```

- 위의 코드를 실행하면 전역 실행 컨텍스트가 생성되고, func()함수 객체가 만들어 진다.
  함수 객체가 생성될 때, 그 함수 객체의 [[scope]]는 현재 실행되는 컨텍스트의 변수 객체에 있는 [[scope]]를 그대로 가진다.
  따라서, func 함수 객체의 [[scope]]는 전역 변수 객체가 된다.

- func() 함수를 실행하면 새로운 컨텍스트가 만들어진다.
  이 컨텍스트를 func컨텍스트라 하면, func컨텍스트의 스코프 체인은 실행된 함수의 [[scope]]프로퍼티를 그대로 복사한 후, 현재 생성된 변수 객체를 복사한 스코프 체인의 맨 앞에 추가한다.
  func() 함수 객체의 [[scope]]프로퍼티가 전역 객체 하나만을 가지고 있었으므로, func 실행 컨텍스트의 스코프 체인은 [func 변수 객체 - 전역 객체]가 된다.

- 스코프체인 정리

  1. 각 함수 객체는 [[scope]] 프로퍼티로 현재 컨텍스트의 스코프 체인을 참조한다.
  2. 한 함수가 실행되면 새로운 실행 컨텍스트가 만들어지는데, 현재 실행되는 함수 객체의 [[scope]] 프로퍼티를 복사하고, 새롭게 생성된 변수 객체를 해당 체인의 제일 앞에 추가한다.
  3. **스코프 체인 = 현재 실행 컨텍스트의 변수 객체 + 상위 컨텍스트의 스코프 체인**

  ```javascript
  var value = "value1";
  function printFunc() {
    var value = "value2";
    function printValue() {
      return value;
    }
    console.log(printValue());
  }
  printFunc(); // value2
  ```

  ```javascript
  var value = "value1";
  function printValue() {
    return value;
  }
  function printFunc(func) {
    var value = "value2";
    console.log(func());
  }
  printFunc(printValue); // value1
  ```

  - **함수가 처음 생성될 당시 실행 컨텍스트가 무엇인지를 생각**
  - 각 함수 객체가 처음 생성될 때 [[scope]]는 전역 객체의 [[scope]]를 참조한다.
  - printFunc 실행 컨텍스트 : value:'value2', Func, this, [[scope]](전역객체, printFunc 변수 객체)
  - printValue 실행 컨텍스트 : this, [[scope]](전역객체, printValue 변수 객체)
