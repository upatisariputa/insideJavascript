# 클래스, 생성자, 메서드

```javascript
function Person(arg) {
  this.name = arg;

  this.getName = function() {
    return this.name;
  };

  this.setName = function(value) {
    this.name = value;
  };
}
var me = new Person("sana");
console.log(me.getName()); // sana

me.setName("mina");
console.log(me.getName()); // mina
```

- 함수 Person이 클래스이자 생성자의 역할을 함
- 즉, 클래스 및 생성자의 역할을 하는 함수가 잇고, 사용자는 new 키워드로 인스턴스를 생성하여 사용할 수 있다.
- 위의 함수에서 생성된 me는 Person의 인스턴스로서 name 변수가 있고, getName()과 setName() 함수가 있다.

```javascript
var me = new Person("me");
var you = new Person("you");
var him = new Person("him");
```

- 위와 같이 객체를 생성하여 사용하면 각 객체는 자기 영역에서 공통적으로 사용할 수 있는 setName(), getName() 따로 생성하고 있고, 메모리가 낭비 됨
- 메모리 낭비를 해결하기 위해 프로토타입을 사용

```javascript
function Person(arg) {
  this.name = arg;
}

Person.prototype.getName = function() {
  return this.name;
};

Person.prototype.setName = function(value) {
  this.name = value;
};

var me = new Person("me");
var you = new Person("you");
console.log(me.getName());
console.log(you.getName());
```

- 위에서는 Person 함수 객체의 prototype프로퍼티에 getName()과 setName() 함수를 정의
- Person으로 객체를 생성하면 각 객체는 함수 객체를 생성할 필요 없이 setName()과 getName()함수를 체인으로 접근 가능

```javascript
//메서드 정의로 OOP 접근 (위의 함수와 동일)
Function.prototype.method = function(name, func) {
  this.prototype[name] = func;
};

function Person(arg) {
  this.name = arg;
}

Person.method("setName", function(value) {
  this.name = value;
});

Person.method("getName", function() {
  return this.name;
});

var me = new Person("me");
var you = new Person("you");
console.log(me.getName());
console.log(you.getName());
```
