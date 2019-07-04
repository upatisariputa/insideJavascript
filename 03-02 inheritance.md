# 상속

- 객체 프로토타입 체인을 사용하여 상속을 구현

## 프로토타입을 이용한 상속

```javascript
function create_object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}
```

1. create_object()함수는 인자로 들어온 객체를 부모로 하는 자식 객체를 생성하여 반환
2. 새로운 빈함수 객체 F를 만들고, F.prototype 프로퍼티에 인자로 들어온 객체를 참조
3. 함수 객체 F를 생성자로 하는 새로운 객체를 만들어 반환
4. 이렇게 반환된 객체는 부모 객체의 프로퍼티에 접근 가능, 자신의 프로퍼티 생성 가능

```javascript
// create_object()함수를 이용하여 상속 구현
var person = {
  name: "mina",
  getName: function() {
    return this.name;
  },
  setName: function(arg) {
    this.name = arg;
  }
};

function create_object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}

var student = create_object(person);

student.setName("me");
console.log(student.getName()); // me
```

- person 객체를 상속하여 student 객체 생성 (단지 부모 객체에 해당하는 person 객체와 이 객체를 프로토타입 체인으로 참조할 수 있는 자식 객체 student를 만들어서 사용)

  ### jQuery extend()함수

  - extend()함수로 객체에 자신이 원하는 객체 혹은 함수를 추가 한다.

  ```javascript
  // extend()함수 구현
  jQuery.extend = jQuery.fn.extend = function(obj, prop) {
    // 1. jQuery.fn은 jQuery.prototype이다. 따라서 jQuery 함수 객체와 jQuery 함수 객체의 인스턴스 모두 extend 함수가 있음
    // 2. 즉, jQurey.extend()로 호출할 수도 있고, var elem = new jQuery(..); elem.extend();의 형태로도 호출 가능
    if (!prop) {
      prop = obj;
      obj = this;
    }
    // 1. extend 함수의 인자가 하나만 들어오는 경우에는 현재 객체(this)에 인자로 들어오는 객체의 프로퍼티를 복사
    // 2. 인자가 두개가 들어오는 경우 첫 번째 객체에 두 번째 객체의 프로퍼티를 복사
    for (var i in prop) obj[i] = prop[i];
    // 1. 루프를 돌면스 prop의 프로퍼티를 obj로 복사
    // 2. 얕은 복사를 함
    return obj;
    // extend함수를 구현하는 경우 대상이 객체일 때는 깊은 복사를 하는 것이 일반적(깊은 복사를 하려면 대상이 객체인 경우는 빈 객체를 만들어 extend함수를 재귀적으로 호출)
  };
  ```

- extned()함수를 추가하여 활용

```javascript
var person = {
  name: "mina",
  getName: function() {
    return this.name;
  },
  setName: function(arg) {
    this.name = arg;
  }
};

function create_object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}

function extend(obj, prop) {
  if (!prop) {
    prop = obj;
    obj = this;
  }
  for (var i in prop) obj[i] = prop[i];
  return obj;
}

var student = create_object(person);
var added = {
  setAge: function(age) {
    this.age = age;
  },
  getAge: function() {
    return this.age;
  }
};
extend(student, added);

student.setAge(25);
console.log(studnet.getAge()); // 25
```

## 클래스 기반 상속

- 프로토타입을 이용한 상속과 비슷

```javascript
function Person(arg) {
  this.name = arg;
}

Person.prototype.setName = function(value) {
  this.name = value;
};

Person.prototype.getName = function() {
  return this.name;
};

function Student(arg) {}

var you = new Person("momo");
Student.prototype = you;

var me = new Studnet("mina");
me.setName("mina");
console.log(me.getName());
```

1. Student 함수 객체를 만들어서, 이 함수 객체의 프로토타입으로 하여금 Person 함수 객체의 인스턴스를 참조하게 만듦
2. Student 함수 객체로 생성된 객체 me의 [[prototype]]링크가 생성자의 프로토타입 프로퍼티 Student.prototype인 you를 가리킴
3. new Person()으로 만들어진 객체의 [[prototype]]링크는 Person.prototype을 가라키는 포로토타입 체인이 형성
4. 객체 me는 Person.prototype 프로퍼티에 접근할 수 있고, setName(), getName()호출 가능

- me 인스턴스를 생성할 때 부모 클래스인 Person의 생성자를 호출하지 않음
  var me = new Studnet('mina') 코드로 'mina'를 인자로 넘겼으나, 이를 반영하는 코드는 없다.
  생성된 me 객체는 빈 객체이다. setName()메서드가 호출되고 나서야 me객체에 name 프로퍼티가 만들어 진다.
  ```javascript
  function Student(arg) {
    Person.apply(this, arguments);
  }
  ```
  위의 코드를 추가하여 부모클래스의 생성자를 호출

```javascript
function Person(arg) {
  this.name = arg;
}

Function.prototype.method = function(name, func) {
  this.prototype[name] = func;
};

Person.method("setName", function(value) {
  this.name = value;
});
Person.method("getName", function() {
  return this.name;
});
function Student(arg) {}
function F() {}
F.prototype = Person.prototype;
Student.prototype = new F();
Student.prototype.constructor = Student;
Student.super = Person.prototype;

var me = new Studnet();
me.setName("mina");
console.log(me.getName());
```

1. 빈 함수 F()를 생성하고, 이 F()의 인스턴스를 Person.prototype과 Student 사이에 두고, 이 인스턴스를 Student.prototype에 참조되게 함
2. 빈 함수의 객체를 중간에 두어 Person의 인스턴스와 Student의 인스턴스를 서로 독립적으로 만듦
3. Person 함수 객체에서 this에 바인딩되는 것은 Student의 인스턴스가 접근 불가
