# 실행 컨텍스트 개념

- 실행 컨텍스트 : 실행가능한 코드를 형상화하고 구분하는 추상적인 개념
  실행 가능한 자바스크립트 코드 블록이 실행되는 환경
  현재 실행되는 컨텍스트에서 이 컨텍스트와 관련 없는 실행 코드가 실행되면, 새로운 컨텍스트가 생성되어 스택에 들어가고 제어권이 그 컨텍스트로 이동한다.

```javascript
console.log("This is global context");

function ExContext1() {
  console.log("This is ExContext1");
}

function ExContext2() {
  ExContext1();
  console.log("This is ExContext 2");
}

ExContext2();
```

1. 전역 실행 컨텍스트가 가장 먼저 실행 된다.
2. 이 과정에서 새로운 함수 호출이 발생하면 새로운 컨텍스트가 만들어지고 실행되며, 종료되면 반환 된다.
3. 위의 과정이 반복되고, 전역 실행 컨텍스트의 실행이 완료되면 모든 실행이 끝난다.
