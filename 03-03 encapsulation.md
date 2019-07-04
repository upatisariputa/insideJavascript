# 캡슐화

- 관련된 여러가지 정보를 하나의 틀 안에 담는 것

```javascript
var Person = function(arg) {
  var name = arg ? arg : "mina";
  this.getName = function() {
    return name;
  };
  this.setName = function(arg) {
    name = arg;
  };
};

var me = new Person();
console.log(me.getName()); // mina
me.setName("momo");
console.log(me.getName()); // momo
console.log(me.name); // undefined
```

1. private 멤버로 name을 선언, public메서드로 getName()과 setName()을 선언
2. var로 선언된 멤버들은 외부에서 접근 불가(this 객체의 프로퍼티로 선언하면 외부에서 new 키워드로 생성한 객체로 접근 가능)
3. public메서드가 클로저 역할을 하면서 private멤버인 name에 접근 가능

```javascript
// 다듬기
var Person = function(arg) {
  var name = arg ? arg : "mina";
  return {
    getName: function() {
      return name;
    },
    setName: function() {
      name = arg;
    }
  };
};

var me = new Person();
console.log(me.getName()); // mina
```

1. Person 함수를 호출하여 객체를 반환 받음
2. 이 객체에 Person 함수의 private 멤버에 접근할 수 있는 메서드들이 담겨있음
3. 사용자는 반환받는 객체로 메서드를 호출 가능, private 멤버에 접근 가능
4. 주의 : 접근하는 private 멤버가 객체나 배열이면 얕은 복사로 참조만을 반환

   ```javascript
   // 접근하는 private 멤버가 객체나 배열이면 얕은 복사로 참조만을 반환
   var ArrCreate = function(arg) {
     var arr = [1, 2, 3];
     return {
       getArr: function() {
         return arr;
       }
     };
   };

   var obj = ArrCreate();
   var arr = obj.getArr();
   arr.push(5);
   console.log(obj.getArr); // [1,2,3,5]
   // arr을 변경 가능
   ```

   - 위의 경우 객체를 반환하지 않고, 객체의 주요 정보를 새로운 객체에 담아서 반환하는 방법을 사용
   - 객체가 반환되어야 하는 경우 깊은 복사로 복사본을 만들어서 반환하는것이 좋음

5. 사용자가 반환받은 객체는 Person 함수 객체의 프로토타입에는 접근 불가

- 객체를 반환하는 것이 아닌 함수를 반환

```javascript
// 객체를 반환하는 것이 아닌 함수를 반환
var Person = function(arg){
    var name = arg ? arg : 'mina'

    var Func = function(){}
    Func.prototype = {
        getName : function(){
            return name
        }
        setName : function(arg){
            name = arg
        }
    }
    return Func
}()

var me = new Person()
console.log(me.getName())
```

1. 클로저를 활용하여 name을 접근 불가하게
2. 즉시 실행 함수에서 반환되는 Func가 클로저가 되고 이 함수가 참조하는 name 프로퍼티가 자유 번수가 됨
