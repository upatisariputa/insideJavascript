## 유사 배열 객체

- 배열의 length 프로퍼티에서 설명했듯이 배열의 length 프로퍼티는 배열의 동작에 있어서 중요한 프로퍼티이다. 그렇다면 만약 일반 객체에 length라는 프로퍼티가 있으면 어떻게 될까?
  자바스크립트에서는 이렇게 length 프로퍼티를 가진 객체를 유사 배열 객체라고 부른다. 다음 예제에서 객체 obj는 length 프로퍼티가 있으므로 유사 배열 객체이다. 이러한 유사 배열 객체의 가장 큰 특징은 객체임에도 불구하고,
  자바스크립트의 표준 배열 메서드를 사용하는 게 가능하다는 것이다.

  ```javascript
  var arr = ["bar"];
  var obj = {
    name: "foo",
    length: 1
  };

  arr.push("baz");
  console.log(arr); // ['bar', 'barz]
  obj.push("baz"); // error
  ```

- 앞 예제처럼 console.log(arr)의 경우 배열 arr은 push() 표준 배열 메서드를 활용해서 'baz'원소를 추가하는 것이 가능한 반면에, 유사배열객체 obj는 당연히 배열이 아니므로 바로 push() 메서드를 호출할 경우 에러가 발생한다. 유사 배열 객체의 경우 apply()메서드를 사용하면 객체지만 표준 배열 메서드를 활용하는 것이 가능하다.

  ```javascript
  var arr = ["bar"];
  var obj = { name: "foo", length: 1 };
  arr.push("baz");
  console.log(arr); // ['bar', 'baz']

  Array.prototype.push.apply(obj, ["baz"]);
  console.log(obj); // {'1': 'baz', name: 'foo', length: 2}
  ```
