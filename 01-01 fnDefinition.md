# 함수와 프로토타입 체이닝

1. 함수 정의

   - 함수 선언문
   - 함수 표현식
   - function() 생성자 함수

   1-1 함수 리터럴

   ```javascript
   function add(x, y) {
     return x + y;
   }
   ```

   1-2 함수 선언문 방식

   - 선언문 방식으로 정의된 함수의 경우는 반드시 함수명이 정의되어 있어야 한다.

   ```javascript
   function add(x, y) {
     return x + y;
   }
   ```

   - 함수 표현식 방식

   - 함수 리터럴로 하나의 함수를 만들고, 여기서 생성된 함수를 변수에 할당하여 함수를 생성하는 것

   1-3 익명 함수 표현식

   ```javascript
   var add = function(x, y) {
     return x + y;
   };
   var plus = add;
   ```

   - 기명 함수 표현식

   ```javascript
   var add = function sum(x, y) {
     return x + y;
   };
   ```

   sum()함수를 정의하고, 이 함수를 add 함수 변수에 할당
   이 경우 **add() 함수 호출 결과값은 출력되나 sum()함수 호출의 경우 에러 발생**
   **이것은 함수 표현식에서 사용된 함수 이름이 외부코드에서 접근 불가능하기 때문**
   함수 표현식에 사용된 함수 이름은 정의된 함수 내부에서 해당 함수를 재귀적으로 호출하거나, 디버거 등에서 함수를 구분할 때 사용된다.

   함수 선언문 형식으로 정의된 add()함수는 자바스크립트 엔진에 의해 다음과 같은 함수 표현식 형태로 변경 된다.

   ```javascript
   var add = function(x, y) {
     return x + y;
   };
   ```

   함수 이름과 함수 변수의 이름이 add로 같으므로, 함수 이름으로 함수가 호출되는 것처럼 보이지만, 실제로는 add 함수 변수로 함수 외부에서 호출이 가능하게 된 것

   - 함수 표현식 방식으로 구현한 팩토리얼 함수

   ```javascript
   var factorialVar = function factorial(n) {
     if (n <= 1) {
       return 1;
     }
     return n * factorial(n - 1);
   };
   console.log(factorialVar(3)); // 6
   console.log(factorial(3)); // error
   ```

   1-4 Function() 생성자 함수를 통한 함수 생성하기

   - new Function(arg1, arg2, ... argN, functionBody)

   ```javascript
   var add = new Function("x", "y", "return x+y");
   ```

   1-5 함수 호이스팅

   - 자바스크립트에서 함수 생성하는 3가지 방법이 있으나 같은 기능의 함수를 생성한다.
     하지만 동작 방식에 차이가 있는데 그중의 하나가 함수 호이스팅이다.

   - 함수 선언문 방식과 함수 호이스팅

   ```javascript
   add(2, 3); //5
   // 함수 선언문 형태로 add() 함수 정의
   function add(x, y) {
     return x + y;
   }
   add(3, 4); // 7
   ```

   위의 코드에서 add(2,3)은 함수가 아직 정의 되지 않았음에도 정의된 add() 함수를 호출하는 것이 가능하다.
   이것은 함수가 자신이 위치한 코드에 상관없이 **함수 선언문 형태로 정의한 함수의 유효범위는 코드의 맨 처음부터 시작**
   이것을 **함수 호이스팅**이라 한다.

   - 함수 표현식 방식과 함수 호이스팅

   ```javascript
   add(2, 3); // uncaught type error
   // 함수 표현식 형태로 add() 함수 정의
   var add = function(x, y) {
     return x + y;
   };
   add(3, 4); // 7
   ```

   add()함수는 **함수 표현식 형태로 정의되어 호이스팅이 일어나지 않는다.**
   함수가 생성된 이후에 호출이 가능하다.

   - 함수 호이스팅이 발생하는 원인은 자바스크립트의 변수생성과 초기화의 작업이 분리 돼서 진행되기 때문
