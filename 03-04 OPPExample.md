# 객체지향 프로그래밍 예제

## 클래스의 기능을 가진 subClass 함수

- 기존 클래스와 같은 기능을 하는 자바스크립트 함수 생성(아래의 기능을 사용)
  1. 함수의 프로토타입 체인
  2. extend함수
  3. 인스턴스를 생성할 때 생성자 호출

#### subClass 함수 구조

- subClass는 상속받을 클래스에 넣을 변수 및 메서드가 담긴 객체를 인자로 받아 부모 함수를 상속 받는 자식 클래스를 만든다.
- 여기서 부모 함수는 subClass()함수를 호출할 때 this 객체를 의미

```javascript
var SuperClass = subClass(obj);
var SubClass = SuperCalss.subClass(obj);
```

- 위처럼 SuperClass를 상속받는 subClass를 만들고자 할때 SuperClass, subClass()의 형식으로 호출하게 구현
- 최상위 클래스인 SuperClass는 자바스크립트의 Function을 상속 받게 한다.

```javascript
// 함수 subClass의 구조는 다음과 같이 구성
function subClass(obj) {
  /*  1. 자식 클래스 (함수 객체) 생성
    2. 생성자 호출
    3. 프로토타입 체인을 활용한 상속 구현
    4. obj를 통해 들어온 변수 및 메서드를 자식 클래스에 추가
    5. 자식 함수 객체 반환 */
}
```

### 자식 클래스 생성 및 상속

```javascript
function subClass(obj){
    ............

    var parent = this
    var F = function(){}

    var child = function(){}
}
```
